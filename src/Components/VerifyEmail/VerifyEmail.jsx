import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET, getUnnauthenticatedHeaders, POST } from '../../fetching/fetching'
import './VerifyEmail.css'

const VerifyEmail = () => {
    const { verification_token } = useParams()
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await GET(`http://localhost:5000/api/auth/verify/${verification_token}`, {
                    headers: getUnnauthenticatedHeaders(),
                })
                setResponse(res);
            } catch (error) {
                console.error('Error verificando el email: ', error)
                setResponse({ok: false})
            } finally {
                setIsLoading(false)
            }
        }
        verifyEmail()
    }, [verification_token])
        
    if(isLoading) {
        return <h2>Verificando Email...</h2>
    }

    return (
        <div className='verifyEmail-container'>
            {
                response.ok
                ?
                (
                <div>
                    <h2>Email verificado con éxito! &#9989; &#127881; &#129395;</h2>
                    <p>Redireccionando a la página de inicio de sesión...</p>
                        <meta http-equiv="refresh" content="5; URL='/login'" />
                </div>
                ) 
                :
                (
                    <h2>Error al verificar el email &#10060;</h2>
                )
            }
        </div>
    )
    
}

export default VerifyEmail