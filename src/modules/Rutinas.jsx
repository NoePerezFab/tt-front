import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { env } from "./env";
import Menu from "./Menu";

const Rutinas = () => {
  const [red, setred] = useState(0);
  const [rutinas, setrutinas] = useState([]);
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
      console.log(responseJson);
      setrutinas(responseJson);
    };

    const usuario = localStorage.getItem("usuario");
    if (usuario === null || usuario === undefined) {
      setred(1);
    }
    getRutinas();
  }, []);

  return red === 0 ? (
    <>
      <Menu />
      <div className="h-100 w-100 text-white">
        <table class="table table-dark">
          <thead class="thead-dark text-center">
            <tr>
              <th scope="col">Tiempo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Promedio patadas/s</th>
              <th scope="col">Patada mas rapida</th>
              <th scope="col">Patada mas lenta</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Rutinas;
