import React from 'react'
import './UnauthenticatedUser.css'
import { Link } from 'react-router-dom'


const UnauthenticatedUser = () => {
return (
    <div className='UnauthenticatedUser-container'> 
        <div className='UnauthenticatedUser-container-2'>
            <h1>No tienes permisos para acceder a esta pagina, o la pagina no existe</h1>
            <span>Tal vez tu tampoco existas...</span>
        </div>
        <div className='link-login'>
            <Link to={'/login'}>Iniciar Sesion</Link>
        </div>
        
    </div>
)
}

export default UnauthenticatedUser