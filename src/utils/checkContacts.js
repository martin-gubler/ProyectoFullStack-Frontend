const checkContactInDatabase = async (contactName) => {
    try {
        const response = await fetch(`https://tuapi.com/contactos?name=${encodeURIComponent(contactName)}`);
        if (!response.ok) {
            throw new Error('Error al verificar el contacto');
        }
        
        const data = await response.json();
        // Supongamos que la API devuelve un array de contactos
        return data.length > 0; // Devuelve true si el contacto existe
    } catch (error) {
        console.error('Error al verificar el contacto en la base de datos:', error);
        return false; // Devuelve false en caso de error
    }
};

export default checkContactInDatabase