import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import extractFormData from '../../utils/extractFormData.js'
import useForm from '../../Hooks/useForm'
import { POST, getUnnauthenticatedHeaders } from '../../fetching/fetching.js'
import ENVIROMENT from '../../enviroment.js'
import './Register.css'


const Register = () => {
    const navigate = useNavigate()

    const form_fields = {
        'name': '',
        'email': '',
        'password': ''
    }

    const {form_values_state, handleChangeInputValue} = useForm(form_fields)
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false)
    //Los estados son inmutables no se deben modificar
    const validateFields = () => {
        const errors = {};
        const { name, email, password } = form_values_state;

        if (!name.trim()) errors.name = 'El nombre es obligatorio.';
        if (!email.trim()) {
            errors.email = 'El correo es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'El formato del correo no es válido.';
        }
        if (!password.trim()) {
            errors.password = 'La contraseña es obligatoria.';
        } else if (password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0; // Devuelve `true` si no hay errores
    };

    const handleSubmitRegisterForm = async ( event ) => {
        event.preventDefault()
        setError('')
        setFieldErrors({}); // Limpia errores previos

        if (!validateFields()) return; // Si hay errores, no se envía el formulario
        
        
        setLoading(true)

        const { name, email, password} = form_values_state;
        
        if(!name || !email || !password){
            setError('Todos los campos son requeridos')
            setLoading(false)
            return
        }
        
        try{    
            const body = await POST(
                `${ENVIROMENT.URL_BACKEND}/api/auth/register`, 
                
                {
                    headers: getUnnauthenticatedHeaders(),
                    body: JSON.stringify(form_values_state)
                }
            )
            console.log(body)
            if (body.error) {
                setError(body.error.message || 'ocurrio un error al registrarse')
            }
            else {
                console.log('Usuario registrado con exito', body)
                navigate('/login')
            }
        }
        catch(error) {
            setError('Error en el servidor. Intentalo mas tarde')
        } finally {
            setLoading(false)
        }
        

    }
return (
<div className="register-container">
    <h1>Regístrate en WhatsApp</h1>
    <form onSubmit={handleSubmitRegisterForm} className="register-form">
        <div>
            <label htmlFor="name">Ingrese su nombre</label>
            <input
                name="name"
                id="name"
                placeholder="Pepe Suarez"
                onChange={handleChangeInputValue}
            />
            {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
        </div>
        <div>
            <label htmlFor="email">Ingrese su email</label>
            <input
                name="email"
                id="email"
                placeholder="pepesuarez@gmail.com"
                onChange={handleChangeInputValue}
            />
            {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
        </div>
        <div>
            <label htmlFor="password">Ingrese su contraseña</label>
            <input
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleChangeInputValue}
            />
            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
        </div>
        <button type="submit" disabled={loading}> {loading ? 'Registrando...' : 'Registrarte'}</button>
    </form>
    <span className="register-footer">
        Si ya tienes cuenta puedes ir a  <Link to="/login" className="link">login</Link>
    </span>
</div>
    )
}

export default Register