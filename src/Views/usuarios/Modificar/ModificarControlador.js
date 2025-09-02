import { get,put } from "../../../Helpers/Request/api.js"
import { ValidarLetras, ValidarPasswordUsuarios,  ValidarCorreoUsuarios, ValidarNumeros, ValidarCedulaUsuarios, ValidarTelefonoUsuarios, ValidarEspaciosUsuarios,ValidarRegistroActualizacion,validarEspaciosDireccionUsuarios} from "../../../Helpers/Validacion/index.js"
import { Put } from "../../../Helpers/Request/Usuarios.js"
import Swal from 'sweetalert2';
export const modificarUsuariosControlador = async(queryparams = null) =>{
     
    const {id} = queryparams
    
     const nombre = document.querySelector('#nombre') 
     const password = document.querySelector('#contrasena')
     const correo = document.querySelector("#correoElectronico");
     const telefono = document.querySelector("#telefono");
     const cedula = document.querySelector("#cedula");
     const formularioActualizarUsuario = document.querySelector(".formularioActualizarUsuario") 
     const rol = document.querySelector("#rol") 
     const calle = document.querySelector("#calle")
     const numero = document.querySelector("#numero")
     const barrio = document.querySelector("#barrio")
     const municipio = document.querySelector("#municipio")


         //Validacion para que el usuario escriba solo letras 
         nombre.addEventListener("keydown",ValidarLetras)
         //Validacion donde el usuario solo va a escribir letras ,numeros y minimo van a ser 6 caracteres
         
         password.addEventListener("keyup",ValidarPasswordUsuarios)
         
         //Validacion donde se valida si cumple con una sintaxis de correo correcta
         correo.addEventListener("blur",ValidarCorreoUsuarios)
         //Validacion para que solo ingrese digitos
         cedula.addEventListener("keydown",ValidarNumeros)
         //Validacion para que ingrese una cedula de 8 a 10 digitos
         cedula.addEventListener("blur",ValidarCedulaUsuarios)
         //Validacion que solo permite que se ingrese numeros  
         telefono.addEventListener("keydown",ValidarNumeros)
         //Validacion que ingrese un numero valido 
         telefono.addEventListener("blur",ValidarTelefonoUsuarios)
         //validacion de calle para que solo ingrese numeros
         calle.addEventListener("keydown",ValidarNumeros)
         //validacion de barrio para que solo ingrese texto
         barrio.addEventListener("keydown",ValidarLetras)
         
         
         //Utilizo mas que todo el evento keyUp en vampos donde tengo que tener cantidades exactas por ejemplo en numero de telefono es 10 caracteres y en repetir la contraseña tiene que ser exactamente a la contraseña original
         
         
         //Validacion para no exitan espacios en blanco 
         nombre.addEventListener("keyup",ValidarEspaciosUsuarios)
         correo.addEventListener("keyup",ValidarEspaciosUsuarios)
         cedula.addEventListener("keyup",ValidarEspaciosUsuarios)
         telefono.addEventListener("keyup",ValidarEspaciosUsuarios)
         
         
         calle.addEventListener("keyup",(e)=>{validarEspaciosDireccionUsuarios(calle,numero,barrio)})
         numero.addEventListener("keyup",(e)=>{validarEspaciosDireccionUsuarios(calle,numero,barrio)})
         barrio.addEventListener("keyup",(e)=>{validarEspaciosDireccionUsuarios(calle,numero,barrio)})
       

     

     const usuariosPorId = await get(`usuarios/${id}`)
    
     console.log(usuariosPorId)
    nombre.value = usuariosPorId.nombre;
    correo.value = usuariosPorId.correo_electronico
    telefono.value = usuariosPorId.telefono 
    cedula.value = usuariosPorId.cedula
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
             if(respuesta.mensaje ){
             await Swal.fire({
                     icon: 'success',
                     title: '¡Éxito!',
                     text: respuesta.mensaje || "Usuario actualizado",
                     confirmButtonText: 'Aceptar'
                     });
               location.reload } 
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