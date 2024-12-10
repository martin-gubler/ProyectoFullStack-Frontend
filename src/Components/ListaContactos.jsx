import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ListaContactos.css'
import { getAuthenticatedHeaders} from '../fetching/fetching.js'


const ListaContactos = () => {
    const [contactos, setContactos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/contacts', {
                    headers: getAuthenticatedHeaders()
                });
                const result = await response.json();
                setContactos(result.data.contacts || []); // Guarda los contactos en el estado
            } catch (error) {
                console.error('Error al obtener contactos:', error);
            }
        };

        fetchContactos();
    }, []);

    const filteredContactos = Array.isArray(contactos)
    ? contactos.filter((contacto) =>
        contacto.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


return (
    <div className='lista-contactos-container'>
        <div className='div-chats'>
            <h1 className='chats'>Chats </h1>
                    <input
                type='text'
                placeholder='Buscar contactos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='buscador-contactos'
                    />
                <div>
                    <Link to={'/login'}><i className="bi bi-chevron-compact-left"></i></Link>
                </div>
        </div>

    <div className='contactos-container'>
        {filteredContactos.map((contacto) => (
            <div className='contacto-container' key={contacto._id}>
                <div className='div-foto'>
                    <img className='imagen' src={contacto.profilePicture || 'default.jpg'} />
                </div>
                <div className='nombre-contacto'>
                    <h2>
                        <Link className='link' to={`/conversation/${contacto._id}`}>
                            {contacto.name}
                        </Link>
                    </h2>
                    <div className='ultima-conexion'>
                        <span>{contacto.ultimaConexion}</span>
                    </div>
                </div>
                
            </div>
        ))}
    </div>
</div>
)
}


export default ListaContactos