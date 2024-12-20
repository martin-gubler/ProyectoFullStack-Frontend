import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import extractFormData from '../../utils/extractFormData.js'
import { POST, getUnnauthenticatedHeaders } from '../../fetching/fetching.js'
import ENVIROMENT from '../../enviroment.js'
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validateFields = (formValues) => {
        const errors = {};
        const { email, password } = formValues;

        if (!email.trim()) {
            errors.email = 'El correo es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'El formato del correo no es válido.';
        }
        if (!password.trim()) {
            errors.password = 'La contraseña es obligatoria.';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmitLoginForm = async (e) => {
        
        e.preventDefault()
        setError('');
        setFieldErrors({});
        setLoading(true);

        const form_HTML = e.target
        const form_Values = new FormData(form_HTML)
        const form_values_object = {
            email: form_Values.get('email'),
            password: form_Values.get('password')
        }

    try{
        const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/login`, {
        headers: getUnnauthenticatedHeaders(),
        body: JSON.stringify(form_values_object)
        })

        if (response.error) {
            setError(response.error.message || 'Credenciales inválidas');
        } else {
        
        const access_token = response.payload.token
        console.log(access_token)
        sessionStorage.setItem('access_token', access_token)
        sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
        navigate('/')
        
        }
    }
    catch(error){
        setError(error.message)
    } finally {
        setLoading(false)
    }
}

return (
<div className='login-container'>
        <h1>Inicia sesion en WhatsApp!</h1>
        {error && <p className="error-message">{error}</p>}
        <form className='login-form' onSubmit={handleSubmitLoginForm}>
            <div>
                <label htmlFor='email'>Ingrese su email </label>
                <input name='email' id='email' placeholder='pepesuarez@gmail.com'></input>
                {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
            </div>
            <div>
                <label htmlFor='password'>Ingrese su contraseña </label>
                <input name='password' id='password' placeholder='contraseña'></input>
                {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
            </div>
            <button type='submit'disabled={loading}>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</button>
        </form>

    <span className='login-footer'>Si aun no tienes cuenta puedes ir a <Link to='/register'> Registrarse</Link></span>
    <span className='login-footer'>Has olvidado tu contraseña? <Link to='/forgot-password'> Restablecer</Link></span>
    <span className='login-footer'>Verifica tu email<Link to='/verify/:verification_token'> Restablecer</Link></span>
</div>
)
}

export default Login