import Swal from 'sweetalert2';

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

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        const texto = await res.text();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha registrado el pedido correctamente',
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

export const getPedidosNoTerminados = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/no-terminados-por-fecha`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener pedidos no terminados');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener pedidos no terminados:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const getPedidosPorFecha = async (fecha) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/por-fecha/${fecha}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener pedidos por fecha');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener pedidos por fecha:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const getPedidosId = async (id) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/modificar/${id}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener el pedido');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener el pedido:", error);
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

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/${id}`, {
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

export const getPedidosTerminados = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/terminados-fecha`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener pedidos terminados');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener pedidos terminados:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const Delete = async (id) => {
    try {
        const headers = {};
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        const texto = await res.text();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha realizado la eliminación correctamente',
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

export const ObtenerVentasSinPedido = async (select, id) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/sin-pedido/${id}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener ventas sin pedido');
        }

        const data = await response.json();
        data.forEach(element => {
            let opcion = document.createElement("option");
            opcion.value = element.idVenta;
            opcion.textContent = "Venta " + element.idVenta;
            select.append(opcion);
        });
    } catch (error) {
        console.error("Error al obtener ventas sin pedido:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};



