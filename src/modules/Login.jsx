import React, { useState } from 'react'
import {  Navigate } from "react-router-dom";
const Login = () => {

  const [red, setred] = useState(0)

  const login = () =>{
    setred(1)
  }

  return (
    red === 0 ?
    <section className="vh-100" style={{backgroundColor: "#7697B3"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius:"1rem" }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block justify-content-center align-items-center">
              <img src="https://imagenes.elpais.com/resizer/9LoxBNqdZMrI3CbBzp4pPCT5z4U=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/SX32K6F5LLC23GAPZKJYJKGM7A.jpg"
                alt="login form" className="img-fluid h-100" style={{borderRadius:"1rem 0 0 1rem"}}/>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Ingresar</h5>

                  <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example17">Usuario</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example27">Contraserña</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" style={{backgroundColor : "#3B83BD"}} type="button" onClick={login}>Login</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>:
<Navigate to={"/monitoreo"}/>
  )
}

export default Login