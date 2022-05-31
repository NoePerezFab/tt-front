import {  HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./modules/Login";
import Menu from "./modules/Menu";
import Monitoreo from "./modules/Monitoreo";

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/monitoreo" element={<Monitoreo />}/>
        </Routes>
      </Router>
  );
}

export default App;
