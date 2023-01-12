import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { env } from "./env";
import Menu from "./Menu";

const CrearRutina = ({menuActive,setmenuActive}) => {
  const [usuario, setusuario] = useState(null);
  const [red, setred] = useState(0);
  const tiempoTotalMin = useRef(null);
  const tiempoTotalSeg = useRef(null);
  const tiempoEnvio = useRef(null);
  const enviroment = env;

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario === null || usuario === undefined) {
      setred(1);
    }
    setusuario(JSON.parse(usuario));
    setmenuActive(1);
  }, []);

  const onChangeTiempoEnvio = () => {
    if (parseInt(tiempoEnvio.current.value) < 1) {
        tiempoEnvio.current.value = '1'
    }
    else if (parseInt(tiempoEnvio.current.value) > 59) {
        tiempoEnvio.current.value = '59'
    }
  };

  const onChangeTiempoMin = () => {
    if (parseInt(tiempoTotalMin.current.value) < 0) {
        tiempoTotalMin.current.value = '0'
    }
    else if (parseInt(tiempoTotalMin.current.value) > 20) {
        tiempoTotalMin.current.value = '20'
    }
  };

  const onChangeTiempoSeg = () => {
    if (parseInt(tiempoTotalSeg.current.value) < 1) {
        tiempoTotalSeg.current.value = '1'
    }
    else if (parseInt(tiempoTotalSeg.current.value) > 59) {
        tiempoTotalSeg.current.value = '59'
    }
    
  };

    const crearRutina = async(e) => {
        e.preventDefault()
    const tiempoT = (parseInt(tiempoTotalMin.current.value ? tiempoTotalMin.current.value : 0)*60) + parseInt(tiempoTotalSeg.current.value ? tiempoTotalSeg.current.value : 0);
    const tiempoE = parseInt(tiempoEnvio.current.value);
    const rutina = {usuario: {id :usuario.id},tiempo: tiempoT, tiempoEnvio : tiempoE };
    const body = JSON.stringify(rutina)
    const response = await fetch(enviroment.baseUrl+"/api/rutina/nueva",
    { 
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors', // 
        body : body,
        cache: 'default',
      }
      
      
    )
    const responseJson = await response.json()
    console.log(responseJson);
      if(response.ok){
        localStorage.setItem("rutinaMonitoreo",JSON.stringify(responseJson));
        setred(2);
      }
    }


  return red === 0 ? (
    <>
      <Menu menuActive={menuActive} setmenuActive={setmenuActive} />
      <form onSubmit={crearRutina} className="h-100">
      <div className=" d-flex align-items-center h-100 justify-content-center text-center">
        <div className="justify-content-center">
        <div className="card-body p-4 p-lg-5 text-black">
          <h2 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
            Crear rutina
          </h2>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example17">
             <h4> Tiempo total</h4>
            </label>
            <div className="row">
              <div className="col">
                <input
                  min={0}
                  max={59}
                  type="number"
                  placeholder="Minutos"
                  id="form2Example17"
                  className="form-control form-control-lg"
                  ref={tiempoTotalMin}
                  onInput={onChangeTiempoMin}
                />
              </div>
              <h2>:</h2>
              <div className="col">
                <input
                  type="number"
                  onInput={onChangeTiempoSeg}
                  ref={tiempoTotalSeg}
                  min={1}
                  id="form2Example18"
                  placeholder="Segundos"
                  className="form-control form-control-lg"
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example27">
              <h4>Tiempo de envio</h4>
            </label>
            <input
            onInput={onChangeTiempoEnvio}
              type="number"
              ref={tiempoEnvio}
              placeholder="Segundos"
              id="form2Example27"
              className="form-control form-control-lg"
            />
          </div>

          <div className="pt-1 mb-4">
            <button
              className="btn btn-dark btn-lg"
              style={{ backgroundColor: "#3B83BD" }}
              type="submit"
            >
              Crear
            </button>
          </div>
        </div>
        </div>
      </div>
      </form>
    </>
  ) : red === 1 ? (
    <Navigate to={"/"} />
  ):<Navigate to={"/monitoreo"}/>
};

export default CrearRutina;
