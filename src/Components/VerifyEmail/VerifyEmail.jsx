import React, { useState } from 'react';
import { POST } from '../../fetching/fetching';
import './VerifyEmail.css';
import ENVIROMENT from '../../enviroment.js';

const VerifyEmail = () => {
    const [verificationToken, setVerificationToken] = useState('');
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/verify`, {
                body: JSON.stringify({ token: verificationToken }),
                headers: { 'Content-Type': 'application/json' },
            });
            setResponse(res);
        } catch (error) {
            console.error('Error verificando el email: ', error);
            setResponse({ ok: false });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='verifyEmail-container'>
            <h1>Verificar Email</h1>
            {isLoading ? (
                <h2>Verificando Email...</h2>
            ) : response ? (
                response.ok ? (
                    <div>
                        <h2>Email verificado con éxito! &#9989; &#127881; &#129395;</h2>
                        <p>Redireccionando a la página de inicio de sesión...</p>
                        <meta httpEquiv="refresh" content="5; URL='/login'" />
                    </div>
                ) : (
                    <h2>Error al verificar el email &#10060;</h2>
                )
            ) : (
                <form onSubmit={handleSubmit} className='verifyEmail-form'>
                    <label htmlFor='token'>Ingresa tu token de verificación:</label>
                    <input
                        id='token'
                        type='text'
                        value={verificationToken}
                        onChange={(e) => setVerificationToken(e.target.value)}
                        placeholder='Ingresa tu token aquí'
                        required
                    />
                    <button type='submit'>Verificar</button>
                </form>
            )}
        </div>
    );
};

export default VerifyEmail;
