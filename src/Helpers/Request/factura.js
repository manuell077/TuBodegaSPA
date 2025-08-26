import Swal from 'sweetalert2';

export const traerPedidos = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:8080/Tu_Bodega/api/pedidos/sin-factura', {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener pedidos sin factura');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener pedidos sin factura:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const traerMediosDePago = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:8080/Tu_Bodega/api/factura/MedioDePago', {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener medios de pago');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener medios de pago:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const traerValorVenta = async (id) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/pedidoVenta/${id}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener valor de venta');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener valor de venta:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const post = async (event, data) => {
    event.preventDefault();

    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/factura`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        const texto = await res.text();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha registrado la factura correctamente',
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

export const obtenerFacturaCompleta = async (id) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/factura/${id}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener la factura');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener la factura:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const obtenerDatosDeEmpleado = async (idPedido) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/factura/empleado/${idPedido}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener datos del empleado');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener datos del empleado:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};