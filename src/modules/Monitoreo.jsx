import React from 'react'
import Menu from './Menu'
import graf from '../images/descarga.png'

const Monitoreo = () => {
  return (
    <>
        <Menu/>
        <img src={graf} alt="" className='' /> 
        <img src={graf} alt="" className='h-40 w-30' />
        <img src={graf} alt="" className='h-30 w-30' />
        <img src={graf} alt="" className='' /> 
        <img src={graf} alt="" className='h-30 w-30' />
        <img src={graf} alt="" className='h-30 w-30' />
    </>
  )
}

export default Monitoreo