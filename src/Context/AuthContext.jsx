//Guardar un estado globalmente que va a decir si estamos o no autentificados globalmente
//Decimos autentificado a cualquier usuario que tenga access-token cargado en el local/sessionStorage

import { useContext, createContext, useState, useEffect } from "react";

export const Authcontext = createContext()

export const AuthContextProvider = ({children}) => {
    const access_token = sessionStorage.getItem('access_token')
    //Estado booleano
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
        Boolean(access_token)
    )

    useEffect(
        () => {
            const access_token = sessionStorage.getItem('access_token')
            if(access_token) {
                setIsAuthenticatedUser(true)
            }
        },
        []
    )
    
    const logout = () => {
        sessionStorage.removeItem('access_token')
        setIsAuthenticatedUser(false)
    }
    console.log(isAuthenticatedUser)

    return(
        <Authcontext.Provider value={{  
            logout,
            isAuthenticatedUser
        }} >
            {children}
        </Authcontext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(Authcontext) //devuelve un objeto con {logout, isAuthenticatedUser}
}
