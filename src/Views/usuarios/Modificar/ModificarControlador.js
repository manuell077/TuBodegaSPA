import { get,put } from "../../../Helpers/Request/api.js"
import {ValidarRegistro, ValidarLetras,ValidarEspacios, ValidarPasswordUsuarios,  ValidarCorreoUsuarios, ValidarNumeros, ValidarDireccion,ValidarCedulaUsuarios, ValidarTelefonoUsuarios, ValidarEspaciosUsuarios,ValidarRegistroActualizacion} from "../../../Helpers/Validacion/index.js"
import { Put } from "../../../Helpers/Request/Usuarios.js"
import Swal from 'sweetalert2';
export const modificarUsuariosControlador = async(queryparams = null) =>{
     
    const {id} = queryparams
    
     const nombre = document.querySelector('#nombre') 
     const password = document.querySelector('#contrasena')
     const correoElectronicoInput = document.querySelector("#correoElectronico");
     const telefonoInput = document.querySelector("#telefono");
     const cedulaInput = document.querySelector("#cedula");
     const formularioActualizarUsuario = document.querySelector(".formularioActualizarUsuario") 
     const rol = document.querySelector("#rol") 
     const calle = document.querySelector("#calle")
     const numero = document.querySelector("#numero")
     const barrio = document.querySelector("#barrio")
     const municipio = document.querySelector("#municipio")


         //Validacion para que el usuario escriba solo letras 
         nombre.addEventListener("keydown",ValidarLetras)
         //Validacion donde el usuario solo va a escribir letras ,numeros y minimo van a ser 6 caracteres
         
         //Validacion donde se valida si cumple con una sintaxis de correo correcta
         correoElectronicoInput.addEventListener("keydown",ValidarCorreoUsuarios)
         //Validacion para que solo ingrese digitos
         cedulaInput.addEventListener("keydown",ValidarNumeros)
         //Validacion para que ingrese una cedula de 8 a 10 digitos
         cedulaInput.addEventListener("keyup",ValidarCedulaUsuarios)
         //Validacion que solo permite que se ingrese numeros  
         telefonoInput.addEventListener("keydown",ValidarNumeros)
         //Validacion que ingrese un numero valido 
         telefonoInput.addEventListener("keyup",ValidarTelefonoUsuarios)
         

         //Validacion para no exitan espacios en blanco 
             nombre.addEventListener("keyup",ValidarEspaciosUsuarios)
             
             correoElectronicoInput.addEventListener("keyup",ValidarEspaciosUsuarios)
             cedulaInput.addEventListener("keyup",ValidarEspaciosUsuarios)
             telefonoInput.addEventListener("keyup",ValidarEspaciosUsuarios)
             


     const usuariosPorId = await get(`usuarios/${id}`)
    
     console.log(usuariosPorId)
    nombre.value = usuariosPorId.nombre;
    correoElectronicoInput.value = usuariosPorId.correo_electronico
    telefonoInput.value = usuariosPorId.telefono 
    cedulaInput.value = usuariosPorId.cedula
    calle.value = usuariosPorId.direccionCompleta.calle 
    numero.value = usuariosPorId.direccionCompleta.numero
    barrio.value = usuariosPorId.direccionCompleta.barrio
     
    const municipioSeleccionado = usuariosPorId.municipio.idMunicipio

    const muni = await  get('usuarios/municipiosAutenticados')
    
   muni.forEach(element => {
    const opcion = document.createElement("option")
        opcion.value = element.idMunicipio
        opcion.textContent = element.nombreMunicipio
        if (element.idMunicipio === municipioSeleccionado) {
        opcion.selected = true;
    }
        municipio.appendChild(opcion)
});
    
    if(usuariosPorId.rol == 1){
       
       rol.value = 1

    }else{

        rol.value = 2
    }

    
    formularioActualizarUsuario.addEventListener('submit',async(e)=>{
        e.preventDefault()
        let objeto =  ValidarRegistroActualizacion(e)
         
        console.log(objeto)
        
            if(objeto != false){
             objeto["rol"] = rol.value  
             if(password.value == ""){
             objeto["password"] = "manuel270905"
             }else{
                objeto["password"] = password.value
             }
             
             objeto["direccion"] = usuariosPorId.direccion
             
             const respuesta = await put(`usuarios/${id}`,objeto)
             await Swal.fire({
                     icon: 'success',
                     title: '¡Éxito!',
                     text: respuesta.message,
                     confirmButtonText: 'Aceptar'
                     });
               location.reload
            }else{
        
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tienes que completar todos los campos',
                confirmButtonText: 'Aceptar'
                 });
            }

    })


}