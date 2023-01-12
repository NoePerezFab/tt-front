import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { env } from "./env";
import Menu from "./Menu";
import Monitoreo from "./Monitoreo";

const Rutinas = ({menuActive,setmenuActive}) => {
  const [red, setred] = useState(0);
  const [rutinas, setrutinas] = useState([]);
  const [patadas, setpatadas] = useState(null)
  const enviroment = env;
  useEffect(() => {
    const getRutinas = async () => {
      const usuario = await JSON.parse(localStorage.getItem("usuario"));

      const response = await fetch(
        enviroment.baseUrl + "/api/rutina/rutina-usuario/" + usuario.id,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
          mode: "cors", //
          cache: "default",
        }
      );
      setmenuActive(2);
      let responseJson = await response.json();
      responseJson = await responseJson.map((r) => {
        if (r.patadas.length > 0) {
            let patadas =  r.patadas.map((p) => p.tiempo);
            patadas =  patadas.filter((p, i) => patadas.indexOf(p) === i);
            patadas.sort((a,b)=>a-b);
          r.promedio = (r.patadas.length / (r.tiempo / 1000)).toFixed(2);
          let masRapida = r.patadas[0].tiempo;
          let masLenta = r.patadas[0].tiempo;
          let anterior = 0;
          patadas.map((p) => {
            if (p - anterior < masRapida) {
              masRapida = p - anterior;
            }
            if (p.tiempo - anterior > masLenta) {
              masLenta = p - anterior;
            }
            anterior = p;
          });
          r.masRapida = (masRapida/1000).toFixed(2);
          r.masLenta = (masLenta/1000).toFixed(2);
        } else {
          r.promedio = "Sin informacion";
          r.masRapida = "N/A";
          r.masLenta = "N/A";
        }

        return r;
      });
      responseJson.reverse();
      console.log(responseJson);
      setrutinas(responseJson);
    };

    const usuario = localStorage.getItem("usuario");
    if (usuario === null || usuario === undefined) {
      setred(1);
    }
    getRutinas();
  }, []);

  useEffect(() => {
    if(menuActive === 2){
      setred(0)
    }
  }, [menuActive])
  

  const mostrarGrafica = (e) => {
    const selected = rutinas.filter(r => r.id == e.target.id)[0];
    localStorage.setItem("rutinaMonitoreo",JSON.stringify(selected));
    setpatadas(selected);
    setred(2);
  }

  return red === 0 ? (
    <>
      <Menu menuActive={menuActive} setmenuActive={setmenuActive} />
      <div className="h-100 w-100 text-white">
        <table class="table table-dark">
          <thead class="thead-dark text-center">
            <tr>
              <th scope="col">Tiempo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Promedio patadas/s</th>
              <th scope="col">Patada mas rapida</th>
              <th scope="col">Patada mas lenta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-white text-center">
            {rutinas.map((e) => {
              return (
                <tr>
                  <td>{e.tiempo / 1000}s</td>
                  <td>{e.fecha}</td>
                  <td>{e.promedio}</td>
                  <td>
                    {isNaN(e.masRapida) ? e.masRapida : e.masRapida+"s"}
                  </td>
                  <td>
                    {isNaN(e.masLenta) ? e.masLenta : e.masLenta + "s"}
                  </td>
                  <td>
                  <button className="btn btn-dark btn-lg" style={{backgroundColor : "#3B83BD"}} type="button" id={e.id} onClick={mostrarGrafica}>Ver grafica</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ) : red == 1 ? (
    <Navigate to={"/"} />
  ) : <Monitoreo data={patadas} menuActive={menuActive} setmenuActive={setmenuActive}/>
};

export default Rutinas;
