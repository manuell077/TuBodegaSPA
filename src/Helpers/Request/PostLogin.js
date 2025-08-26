import Swal from 'sweetalert2';
export async function post (event,data){ //Recibe como parametros el evento y el formulario
    const gridContainer = document.querySelector('.grid-container')
const sidebar = document.querySelector('.sidebar')
    event.preventDefault() //Evitara que se envie el formulario 
    
    try {
        const res = await fetch(`http://localhost:8080/Tu_Bodega/api/usuarios/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const jsonData = await res.json(); // Esperar a convertir la respuesta en JSON
        console.log(jsonData);
        
        if (res.ok) {
            
             // Almacenar token y datos del usuario
            localStorage.setItem('token', jsonData.token);
            localStorage.setItem('refreshToken', jsonData.refreshToken);
            localStorage.setItem('rol', jsonData.usuario.rol);
            localStorage.setItem('nombre', jsonData.usuario.nombre);
            localStorage.setItem('cedula', jsonData.usuario.cedula);

            if (jsonData.usuario.rol == 2) {
                window.location.hash = "#inventario";

                const response = await fetch('./src/Componentes/sidebar.html');
                const sidebarHtml = await response.text();
                sidebar.innerHTML = sidebarHtml;

                const usuario = document.querySelector(".perfil__texto");
                usuario.textContent = "EMPLEADO";

            } else {
                window.location.hash = "#usuarios";

                const response  = await fetch ('./src/Componentes/sidebarAdmin.html')
                const  sidebarHtml = await response.text()
                sidebar.innerHTML = sidebarHtml
                const usuario = document.querySelector(".perfil__texto")
                usuario.textContent = "ADMIN"
            }

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha realizado el login correctamente',
                confirmButtonText: 'Aceptar'
            });

        } else {
            throw new Error(jsonData.error);
        }

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            confirmButtonText: 'Aceptar'
        });
    }

       
    
  
}