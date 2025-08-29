import {get} from "../../Helpers/Request/api.js"
import Swal from 'sweetalert2';
export const perfilController = async(queryParams = null) =>{
    
    const link = document.querySelector(".flecha--perfil a")
    const nombre = document.querySelector("#nombre")
    const telefono = document.querySelector("#telefono")
    const gmail = document.querySelector("#gmail")
    const direccion = document.querySelector("#direccion") 
    const cedulaCampo = document.querySelector("#cedula")
    const salir = document.querySelector(".salir-link") 
    const sidebar=document.querySelector(".sidebar");
    const iconoHamburguesa=document.querySelector(".iconoHamburguesa");

    iconoHamburguesa.classList.add("displayNone");


    link.addEventListener("click",(e)=>{
        e.preventDefault()
        window.location.hash = "#inventario"
    })
    
    const cedula = localStorage.getItem("cedula")
    const respuesta = await get(`usuarios/perfil/${cedula}`) 
    console.log(respuesta[0])

    nombre.textContent = respuesta[0].nombre
    telefono.textContent = "TELEFONO: " + respuesta[0].telefono
    gmail.textContent = "GMAIL: " + respuesta[0].correo_electronico
    direccion.textContent = "DIRECCION: " + respuesta[0].direccionCompletaString
    cedulaCampo.textContent = "CEDULA: " + respuesta[0].cedula

    salir.addEventListener("click", (e) => {
  e.preventDefault(); // evita que el <a> recargue la página

  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se cerrará tu sesión ",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Borra todo el localStorage
      localStorage.clear();

      sidebar.classList.add('sidebarEscondido');

      // Redirige al login o página principal
      window.location.hash = "#login";


      // Alerta de confirmación
      Swal.fire(
        'Sesión cerrada',
        'Has salido correctamente.',
        'success'
      )
    }
  });
})}

  



