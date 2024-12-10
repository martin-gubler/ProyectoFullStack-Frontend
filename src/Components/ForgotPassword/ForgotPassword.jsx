import React from 'react'
import { Link } from 'react-router-dom'
import extractFormData from '../../utils/extractFormData.js'
import { POST, getUnnauthenticatedHeaders } from '../../fetching/fetching.js'
import ENVIROMENT from '../../enviroment.js'
import './ForgotPassword.css'


    const ForgotPassword = () => {

        const handleSubmitLoginForm = async (e) => {
            try {
                e.preventDefault()
                const form_HTML = e.target
                const form_Values = new FormData(form_HTML)
                const form_fields = {
                    'email': ''
                }
                const form_values_object = extractFormData(form_fields, form_Values)
                const body = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, {
                    headers: getUnnauthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                })
                //const body = await sendEmailForgot(form_values_object)
                //Si hubiera algun error, lo imprimen usando el valor de body
                //Por ejemplo, pueden cambiar el estado para que aparezca un error
                //De ser necesario cambien como responde su backend
                if (!body.ok) {
                    //setError()
                }
                console.log({ body })
            }
            catch (error){
                //Errores se manejan aqui
            }
        }

return (
    <div className='forgotPassword-container'>
    <h1>Olvidaste tu contraseña?</h1>
    <p>Enviaremos un mail a tu email de usuario para enviarte los pasos para reestablecer la contraseña</p>
    <form className='forgotPassword-form'onSubmit={handleSubmitLoginForm}>
        <div>
            <label htmlFor='email'>Ingrese su email</label>
            
            <input name='email' id='email' placeholder='pepesuarez@gmail.com'></input>
        </div>

        <button type='submit'>Enviar mail</button>
    </form>
    <span className='forgotPassword-footer'>Si ya tienes cuenta puedes ir a <Link to='/login'>Login</Link></span>
    <span className='forgotPassword-footer'>Si aun no tienes cuenta puedes ir a <Link to='/register'>Registrarte</Link></span>
</div>
  )
}

export default ForgotPassword