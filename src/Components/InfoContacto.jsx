import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './InfoContacto.css'
import { getAuthenticatedHeaders } from '../fetching/fetching.js'
import ENVIROMENT from '../enviroment.js'
const InfoContacto = () => {

  const { receiver_id } = useParams()
  const [contacto, setContacto ] = useState(null)


  console.log('receiver_id:', receiver_id)
  useEffect(() => {
    const fetchInfoContacto = async () => {
      try {
          const response = await fetch(`${ENVIROMENT.URL_BACKEND}/api/contacts/InfoContacto/${receiver_id}`, {
              headers: getAuthenticatedHeaders()
          });
          console.log(response.message)
          if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.statusText}`)
          }
          
          const result = await response.json();
          setContacto(result.data);
      } catch (error) {
          console.error('Error al obtener info del contacto:', error);
      }
  };
  fetchInfoContacto()
  }, [receiver_id])

  if (!contacto) {
    return <div>Cargando información del contacto...</div>;
  }


  return (
    <div className='infoContacto-container'>
      <div className='div-titulo'>
        <div className='div-boton-volver'>
          <button className='boton-volver'><Link className='link' to={`/conversacion/${receiver_id}` }><i className="bi bi-chevron-compact-left"></i></Link></button>
        </div>
        <h2 className='titulo'>Informacion del contacto</h2>
      </div>
      <div className='div-imagen'>
        <img className='imagen' src={contacto.profilePicture} alt="" />
      </div>
      <div>
        <h2>{contacto.name}</h2>
      </div>
      <div className='div-botones'>
        <div className='div-boton-1'>
          <button className='boton-llamada'><i class="bi bi-telephone"></i></button>
          <span>Llamar</span>
        </div>
        <div className='div-boton-2'>
          <button className='boton-videollamada'><i class="bi bi-camera-video"></i></button>
          <span>Video</span>
        </div>
        <div className='div-boton-3'>
          <button className='boton-buscar'><i class="bi bi-search"></i></button>
          <span>Buscar</span>
        </div>
      </div>
        <div className='div-funciones'>
          <div className='funciones'>
            <i class="bi bi-images"></i>
            <h3>Archivos multimedia</h3>
          </div>
          <div className='funciones'>
            <i class="bi bi-star-fill"></i>
            <h3>Mensajes destacados</h3>
          </div>
          <div className='funciones'>
            <i class="bi bi-bell"></i>
            <h3>Notificaciones</h3>
          </div>
          <div className='funciones'>
            <i class="bi bi-image"></i>
            <h3>Fondo</h3>
          </div>
          <div className='funciones'>
            <i class="bi bi-download"></i>
            <h3>Guardar en Fotos</h3>
          </div>
          <div className='funciones'>
            <i class="bi bi-clock-history"></i>
            <h3>Mensajes temporales</h3>
          </div>
        </div>
    </div>
  )
}

export default InfoContacto