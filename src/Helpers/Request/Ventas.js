import Swal from 'sweetalert2';
export const Post = async (event, objeto) => {
    event.preventDefault();

    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(objeto)
        });

        const texto = await res.text();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha realizado el registro correctamente',
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
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};

export const ObtenerUsuarios = async (select) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:8080/Tu_Bodega/api/usuarios/rol2", {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener usuarios');
        }

        const data = await response.json();
        let nombreUsuario = localStorage.getItem('nombre');
        let cedula = localStorage.getItem('cedula');

        let opcion = document.createElement("option");
        opcion.value = cedula;
        opcion.textContent = "Nombre: " + nombreUsuario + " Cedula: " + cedula;
        opcion.selected = true;
        select.append(opcion);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};

export const ObtenerProductos = async (select, idSeleccionado) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:8080/Tu_Bodega/api/productos/estado1", {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener productos');
        }

        const data = await response.json();
        data.forEach(element => {
            let opcion = document.createElement("option");
            opcion.value = element.idProducto;
            opcion.textContent = element.nombre;
            opcion.setAttribute("data-precio", element.precio);
            if (element.idProducto === idSeleccionado) {
                opcion.selected = true;
            }
            select.append(opcion);
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
};

export const ObtenerVentas = async (fkUsuario) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/usuario/${fkUsuario}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener ventas');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const ObtenerTodasLasVentas = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/todas`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener todas las ventas');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener todas las ventas:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const ObtenerVentasPorId = async (id) => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/${id}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener la venta');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener la venta:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export const Put = async (id, data) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/${id}`, {
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

export const Delete = async (id) => {
    try {
        const headers = {};
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/${id}`, {
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

export const ObtenerDeudores = async () => {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/deudores`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener deudores');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener deudores:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};