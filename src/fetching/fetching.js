import ENVIROMENT from "../enviroment";

export const POST = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'POST',
			...params
		})

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'Error en la solicitud');
        }
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
	}
}


export const GET = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'GET',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
	}
	
} 



const getUnnauthenticatedHeaders = () => {
	const unnauthenticatedHeaders = new Headers()
	unnauthenticatedHeaders.set('Content-Type', 'application/json')
	unnauthenticatedHeaders.set('x-api-key', '7f7a1160-16e7-47a6-b51d-8f78e85b592d')
	return unnauthenticatedHeaders
}


const getAuthenticatedHeaders = () => {
	const authenticatedHeaders = new Headers()
	authenticatedHeaders.set('Content-Type', 'application/json')
	authenticatedHeaders.set('x-api-key', '7f7a1160-16e7-47a6-b51d-8f78e85b592d')
	authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
	return authenticatedHeaders
}







export {getAuthenticatedHeaders, getUnnauthenticatedHeaders} 
	
	
	//Crear GET, PUT, DELETE