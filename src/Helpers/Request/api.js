import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("El token no existe")
        return true
    };
    try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado " + decoded);
        const currentTime = Date.now() / 1000;
        console.log("Pase todo" + decoded.exp < currentTime)
        return decoded.exp < currentTime;
    } catch (e) {
        console.error(e)
        return true;
    }
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('rol');
        localStorage.removeItem('nombre');
        localStorage.removeItem('cedula');
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La sesión ha expirado',
            confirmButtonText: 'Aceptar'
        });
        location.hash = '#login';
        return null;
    }

    try {
        const response = await fetch('http://localhost:8080/Tu_Bodega/api/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al renovar el token');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('rol', data.usuario.rol);
        localStorage.setItem('nombre', data.usuario.nombre);
        localStorage.setItem('cedula', data.usuario.cedula);
        return data.token;
    } catch (error) {
        console.error('Error al renovar token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('rol');
        localStorage.removeItem('nombre');
        localStorage.removeItem('cedula');
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La sesión ha expirado',
            confirmButtonText: 'Aceptar'
        });
        location.hash = '#login';
        return null;
    }
};

export const getAuthHeaders = async () => {
    let token = localStorage.getItem('token');

    console.log("Expiro?" + isTokenExpired())
    if (!token || isTokenExpired()) {
        console.log("Token expiro")
        token = await refreshAccessToken();
    }
    return token
        ? {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
};

export const get = async (endpoint) => {

    try {
        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/${endpoint}`, {
            headers: await getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al obtener datos de ${endpoint}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en get (${endpoint}):`, error);
        if (error.message !== 'Sesión expirada') {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }

    }

}

export const post_imgs = async (formData) => {
    let token = localStorage.getItem("token"); // Obtiene el token
    if (!token || isTokenExpired()) {
        console.log("Token expiro")
        token = await refreshAccessToken();
    }
    const headers = token ? { 'Authorization': 'Bearer ' + token } : {}; // Prepara los headers
    console.log(headers);

    try {
        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/productos`, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al enviar datos a ${endpoint}`);
        }



        return await response.json();

    } catch (error) {
        console.error(error);
        await Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Error al registrar el producto",
            confirmButtonText: "Aceptar"
        });


    }
}

export const postAutenticado = async (endpoint, info) => {

    try {
        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/${endpoint}`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(info)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al enviar datos a ${endpoint}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en postAutenticado (${endpoint}):`, error);
        if (error.message !== 'Sesión expirada') {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }

    }


}

export const postSinAutenticar = async (endpoint, info) => {

    try {
        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al enviar datos a ${endpoint}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en postSinAutenticar (${endpoint}):`, error);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });

    }
};

export const put = async (endpoint, info) => {
    try {
        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/${endpoint}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify(info)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al actualizar datos en ${endpoint}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en put (${endpoint}):`, error);
        if (error.message !== 'Sesión expirada') {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }

    }
}

export const eliminar = async (endpoint) => {
    try {
        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/${endpoint}`, {
            method: 'DELETE',
            headers: await getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al eliminar datos en ${endpoint}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en eliminar (${endpoint}):`, error);
        if (error.message !== 'Sesión expirada') {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }

    }
}

export const convertirPermisosArray = (permisos) => {
    // Convierte la cadena de permisos en un array de caracteres
    permisos = permisos.split("");
    // Variable auxiliar para construir la cadena limpia
    let aux = "";
    // Recorre cada carácter de la cadena de permisos
    for (let n = 0; n < permisos.length; n++) {
        // Si es el primer carácter, el último o un espacio, lo omite
        if (permisos[n] == " ") continue
        // Agrega el carácter a la variable auxiliar
        aux += permisos[n];
    }
    // Divide la cadena auxiliar por comas para obtener el array de permisos
    permisos = aux.split(",");
    // Retorna el array de permisos
    return permisos;
}

export const tienePermiso = (permiso) => {
    console.log("permisos desde tiene permisos" + permiso)
    // Obtiene la cadena de permisos del localStorage y la convierte en array
    const permisos = convertirPermisosArray(localStorage.getItem('permisos'));
    console.log(permisos)
    // Busca si el permiso existe en el array de permisos
    const existe = permisos.some(perm => perm == permiso);
    // Retorna true si existe, false si no
    console.log("Existe?" + existe)
    return existe
}


