import Swal from 'sweetalert2';
 const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) {console.log("Token expiro") 
        return true};
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log("Paso esto" + decoded.exp < currentTime);
        return decoded.exp < currentTime;
    } catch (e) {
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
    console.log("Token" + token)
    console.log("Expiro?"+ isTokenExpired())
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


