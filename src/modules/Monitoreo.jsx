import React, { useState } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import Menu from "./Menu";
import SockJsClient from "react-stomp";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Monitoreo = () => {
  const [red, setred] = useState(0);
  const [usuario, setusuario] = useState(null);
  const [rutina, setrutina] = useState(null);
  const [patadas, setpatadas] = useState(null);
  const [intervalo, setintervalo] = useState(0);
  const [time, setTime] = useState(0);
  const [patadaMasRapida, setpatadaMasRapida] = useState(0);
  const [patadaMasLenta, setpatadaMasLenta] = useState(0);

  const SOCKET_URL = "http://tt-server.ddns.net:8081/contador-patadas/ws";

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    const rutina = localStorage.getItem("rutinaMonitoreo");
    if (usuario === null || usuario === undefined) {
      setred(1);
    }
    if (rutina === null || rutina === undefined) {
      setred(1);
    }
    console.log(rutina);
    const rutinaJson = JSON.parse(rutina);
    setusuario(JSON.parse(usuario));
    setrutina(rutinaJson);
  }, []);

  const onMessageReceived = async (m) => {
    console.log(m);
    setTime(time + m.tiempoEnvio);
    if (intervalo === 0) {
      await setintervalo(m.tiempoEnvio);
    }
    let patadas = await m.patadas.map((p) => p.tiempo);
    patadas = await patadas.filter((p, i) => patadas.indexOf(p) === i);
    console.log(patadas);
    if (patadas.length > 0) {
      console.log(Math.max(...patadas));
      let ciclos = 0;
      if (intervalo === 0 || time === 0) {
        ciclos = ciclos = Math.ceil(m.tiempoEnvio / m.tiempoEnvio);
        console.log(Math.ceil(m.tiempoEnvio / m.tiempoEnvio));
      } else {
        ciclos = ciclos = Math.ceil((time + intervalo) / intervalo);
      }

      console.log(ciclos);
      let graficaTemp = [];
      const intervaloCiclo = intervalo !== 0 ? intervalo : m.tiempoEnvio;
      console.log(intervaloCiclo);
      graficaTemp.push([0, 0]);
      for (let i = 1; i <= ciclos; i++) {
        const patadasPorCiclo = patadas.filter(
          (p) => p <= i * intervaloCiclo && p > (i - 1) * intervaloCiclo
        );
        console.log(patadasPorCiclo);
        graficaTemp.push([(i * intervaloCiclo) / 1000, patadasPorCiclo.length]);
      }
      setpatadas(graficaTemp);
      console.log(graficaTemp);

      let masRapida = patadas[0];
      let masLenta = patadas[0];
      let anterior = 0;
      patadas.map((p) => {
        if (p - anterior < masRapida) {
          masRapida = p - anterior;
        }  
        if(p-anterior > masLenta){
          masLenta = p - anterior;
        }
        anterior = p;
      });
      setpatadaMasRapida(masRapida);
      setpatadaMasLenta(masLenta);
    } else {
      let ciclos = 0;
      if (intervalo === 0) {
        ciclos = ciclos = Math.ceil(time / m.tiempoEnvio);
      } else {
        ciclos = ciclos = Math.ceil((time + intervalo) / intervalo);
        console.log(time);
        console.log(time / intervalo);
      }
      let graficaTemp = [];
      for (let i = 1; i <= ciclos; i++) {
        graficaTemp.push([(i * intervalo) / 1000, 0]);
      }
      setpatadas(graficaTemp);
      console.log(graficaTemp);
    }
  };

  return red === 0 ? (
    <>
      {rutina && rutina.id ? (
        <>
          <SockJsClient
            url={SOCKET_URL}
            topics={["/call/grafica/" + rutina.id]}
            onConnect={console.log("Connected!")}
            onDisconnect={console.log("Disconnected!")}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />
        </>
      ) : (
        <></>
      )}

      <Menu />
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <AnyChart
          id="lineChart"
          width={800}
          height={600}
          type="line"
          data={patadas}
          title="Patadas por intervalo de tiempo (s)"
        />
      </div>
      <div className="row">
        <div className="col">
          <h1>Patada mas rapida: {patadaMasRapida / 1000}s</h1>
        </div>
        <div className="col">
          <h1>Patada mas lenta: {patadaMasLenta / 1000}s</h1>
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Monitoreo;
