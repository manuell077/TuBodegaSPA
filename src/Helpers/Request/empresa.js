import Swal from 'sweetalert2';

export const traerEmpresas = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:8080/Tu_Bodega/api/empresas', {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener empresas');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const put = async (id, data) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/empresas/${id}`, {
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
                errorMessage = errorData.error || texto;
            } catch {
                errorMessage = texto || 'Error en la solicitud';
            }
            throw new Error(errorMessage);
        }
    } catch (err) {
        console.error("Error:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};