import Swal from 'sweetalert2';
export const Get = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:8080/Tu_Bodega/api/productos', {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener productos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const GetID = async (id) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/productos/${id}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export async function put(id, data) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/productos/${id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data)
        });

        const texto = await res.text();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha realizado la actualización correctamente',
                confirmButtonText: 'Aceptar'
            });
        } else {
            let errorMessage;
            try {
                const errorData = JSON.parse(texto);
                errorMessage = errorData.error || 'Error en la solicitud';
            } catch {
                errorMessage = texto || 'Error en la solicitud';
            }
            throw new Error(errorMessage);
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};

export async function Delete(id) {
    try {
        const headers = {};
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/productos/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La eliminación se ha realizado correctamente',
                confirmButtonText: 'Aceptar'
            });
        } else if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'No se puede eliminar un producto cuando tiene una venta asociada');
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error inesperado al intentar eliminar el producto');
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};