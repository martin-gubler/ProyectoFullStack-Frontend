import React, { useState, useEffect } from 'react'
import './Conversacion.css'
import { Link, useParams } from 'react-router-dom'
import { getAuthenticatedHeaders } from '../fetching/fetching.js'
import ENVIROMENT from '../enviroment.js';

const Conversacion = () => {
    const { receiver_id } = useParams(); 

    const [conversacion, setConversacion] = useState([]);
    const [contacto, setContacto] = useState(null);
    const [estado, setEstado] = useState(null)
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchConversacion = async () => {
            try {
                const response = await fetch(
                    `${ENVIROMENT.URL_BACKEND}/api/messages/conversation/${receiver_id}`,
                    {
                        headers: getAuthenticatedHeaders(),
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setConversacion(data.data.conversation || []);
                    setContacto(data.data.contact.name)
                    setEstado(data.data.contact.ultimaConexion)
                } else {
                    console.error('Error al obtener la conversación:', data.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            } finally {
                setLoading(false);
            }
        };

        if (receiver_id) {
            fetchConversacion();
        }
    }, [receiver_id]);

    const handleEnviarMensaje = async () => {
        if (!nuevoMensaje.trim()) return;

        try {
            const user_info = JSON.parse(sessionStorage.getItem('user_info'));
            const user_id = user_info?.id;


            const response = await fetch(`${ENVIROMENT.URL_BACKEND}/api/messages/send/${receiver_id}`, {
                method: 'POST',
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ content: nuevoMensaje }),
            });
            const data = await response.json();
            if (response.ok) {
                const newMessage = data.data.message;
    
                setConversacion((prevConversacion) => [
                    ...prevConversacion,
                    {
                        ...newMessage,
                        author: user_id, 
                        created_at: new Date().toISOString(), 
                    },
                ]);
                setNuevoMensaje('');
            } else {
                console.error('Error al enviar mensaje:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleEliminarMensaje = async (message_id) => {
        try {
            const response = await fetch(`${ENVIROMENT.URL_BACKEND}/api/messages/delete/${message_id}`, {
                method: 'DELETE',
                headers: getAuthenticatedHeaders(),
            });
    
            if (response.ok) {
                setConversacion((prev) => prev.filter((msg) => msg._id !== message_id));
            } else {
                console.error('Error al eliminar el mensaje');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className='chat-container'>
            <div className='chat-header-main'>
                <div className='div-foto'>
                    <img className='imagen' src={contacto || 'default.jpg'} />
                </div>
                <div className='chat-header'> 
                        <h3>{contacto}</h3>
                        <span>{estado}</span>
                </div>
                <div>
                    <Link to={'/'}><i className="bi bi-chevron-compact-left"></i></Link>
                </div>
            </div>


            {loading ? (
    <p className='loading'>Cargando conversación...</p>
) : (
    <div className='mensajes-container'>
        {conversacion.map((mensaje) => (
            <div
                key={mensaje._id}
                className={`message ${
                    mensaje.author === JSON.parse(sessionStorage.getItem('user_info')).id
                        ? 'sent'
                        : 'received'
                }`}
            >
                <p>{mensaje.content}</p>
                {mensaje.author === JSON.parse(sessionStorage.getItem('user_info')).id && (
                    <div className="message-actions">
                        <span className='hora'>
                                {new Date(mensaje.created_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                        </span>
                        <button 
                            className="delete-button" 
                            onClick={() => handleEliminarMensaje(mensaje._id)}
                        >
                            <i className="bi bi-trash3-fill"></i>
                        </button>
                    </div>
                )}
            </div>
        ))}
    </div>
)}

<div className='input-container'>
    <input
        type='text'
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder='Escribe un mensaje...'
    />
    <button onClick={handleEnviarMensaje}><i className="bi bi-send"></i></button>
</div>

        </div>
    );
};

export default Conversacion;



