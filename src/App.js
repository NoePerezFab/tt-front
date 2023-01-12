import { useState } from "react";
import {  HashRouter as Router, Route, Routes } from "react-router-dom";
import CrearRutina from "./modules/CrearRutina";
import Login from "./modules/Login";
import Menu from "./modules/Menu";
import Monitoreo from "./modules/Monitoreo";
import Rutinas from "./modules/Rutinas";

function App() {
  const [menuActive, setmenuActive] = useState(1)
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/monitoreo" element={<Monitoreo menuActive={menuActive} setmenuActive={setmenuActive} />}/>
        <Route path="/crear-rutina" element={<CrearRutina menuActive={menuActive} setmenuActive={setmenuActive}/>}/>
        <Route path="/rutinas" element={<Rutinas menuActive={menuActive} setmenuActive={setmenuActive} />}/>
        </Routes>
      </Router>
  );
}

export default App;
