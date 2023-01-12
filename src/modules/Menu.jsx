import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({menuActive,setmenuActive}) => {

  const onClickMenu = (active) => {
    setmenuActive(active);
  }

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class={menuActive === 1 ?"nav-link active":"nav-link"} onClick={()=>onClickMenu(1)} href="#/crear-rutina">Crear Rutina</a>
      </li>
      <li class="nav-item">
        <a class={menuActive === 2 ?"nav-link active":"nav-link"} onClick={()=>onClickMenu(2)}  href="#/rutinas">Rutinas Guardadas</a>
      </li>
    </ul>
  </div>
    </nav>
  )
}

export default Menu