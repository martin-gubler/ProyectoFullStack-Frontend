import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


//Outlet, nos llama a la ruta hija o nesteada de nuestra ruta
const ProtectedRoute = () => {
    const isAuthenticatedUser = sessionStorage.getItem('access_token')
    
    return (
        isAuthenticatedUser ? <Outlet/> : <Navigate to={'/unauthenticated'}/>
    )
}

export default ProtectedRoute