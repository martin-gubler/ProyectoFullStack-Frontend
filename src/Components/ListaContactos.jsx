import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ListaContactos.css'
import { getAuthenticatedHeaders} from '../fetching/fetching.js'
import ENVIROMENT from '../enviroment.js'


const ListaContactos = () => {
    const [searchError, setSearchError] = useState('');
    const [contactos, setContactos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [newContact, setNewContact] = useState('')
    const [contactError, setContactError] = useState('')

    
    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await fetch(`${ENVIROMENT.URL_BACKEND}/api/contacts`, {
                    headers: getAuthenticatedHeaders()
                });
                const result = await response.json();
                setContactos(result.data.contacts || []); 
            } catch (error) {
                console.error('Error al obtener contactos:', error);
            }
        };

        fetchContactos();
    }, []);

    const handleAddContact = async () => {
        setContactError('')
        if(!newContact.trim()){
            setContactError('Debes ingresar un nombre de contacto')
            return
        }

        const contactExists = contactos.some(contacto => contacto.name === newContact);
        if (contactExists) {
            setContactError('El contacto ya existe');
            return;
        }

        if (!contactExists) {
            setContactError('El contacto no existe');
            return;
        }


        try {
            const response = await fetch (`${ENVIROMENT.URL_BACKEND}/api/contacts/add`, {
                method: 'POST',
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({name: newContact})
            })
    
            const result = await response.json()
    

            if (!response.ok) {
                throw new Error(result.message || 'Error al a;adir contacto')
            }

            setContactos([...contactos, {name: newContact, _id: Date.now() }])
            setNewContact('')
    } catch (error) {
        console.error('Error al añadir contacto', error)
        setContactError(error.message)
    }
}

    const filteredContactos = Array.isArray(contactos)
    ? contactos.filter((contacto) =>
        contacto.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

    
return (
<div className='lista-contactos-container'>
    <div className='div-chats'>
        <h1 className='chats'>Chats <Link to={'/login'}>
                <i className="bi bi-chevron-compact-left"></i>
            </Link></h1>
         
        <div className='inputs-container'>
            <input
                type='text'
                placeholder={searchError ? searchError: 'Buscar contactos...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`buscador-contactos ${searchError ? 'input-error' : '' }` }
            />
            <input
                type='text'
                placeholder={contactError? contactError : 'Nombre del contacto...'}
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className={`input-nuevo-contacto ${contactError ? 'input-error' : '' }`}
            />
            <button onClick={handleAddContact} className='boton-agregar-contacto'>
                Agregar Contacto
            </button>
        </div>
        {contactError && <p className='error'>{contactError}</p>}

    </div>

    <div className='contactos-container'>
        {filteredContactos.length > 0 ? (
        filteredContactos.map((contacto) => (
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
        )) 
    ) : (
            <p className='no-result'> No se encontraron contactos</p>
    )}
    </div>
</div>

)
}


export default ListaContactos