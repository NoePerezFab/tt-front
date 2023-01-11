import {  HashRouter as Router, Route, Routes } from "react-router-dom";
import CrearRutina from "./modules/CrearRutina";
import Login from "./modules/Login";
import Menu from "./modules/Menu";
import Monitoreo from "./modules/Monitoreo";
import Rutinas from "./modules/Rutinas";

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/monitoreo" element={<Monitoreo />}/>
        <Route path="/crear-rutina" element={<CrearRutina />}/>
        <Route path="/rutinas" element={<Rutinas />}/>
        </Routes>
      </Router>
  );
}

export default App;
