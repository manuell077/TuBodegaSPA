import { ObtenerUsuariosPorId } from "../../../Helpers/Request/Usuarios"
import {ValidarRegistro, ValidarLetras,ValidarEspacios, ValidarPasswordUsuarios,  ValidarCorreoUsuarios, ValidarNumeros, ValidarDireccion,ValidarCedulaUsuarios, ValidarTelefonoUsuarios, ValidarEspaciosUsuarios,ValidarRegistroActualizacion} from "../../../Helpers/Validacion/index.js"
import { Put } from "../../../Helpers/Request/Usuarios.js"
export const modificarUsuariosControlador = async(queryparams = null) =>{
     
    const {id} = queryparams
    
     const nombre = document.querySelector('#nombre') 
     const password = document.querySelector('#contrasena')
     const correoElectronicoInput = document.querySelector("#correoElectronico");
     const telefonoInput = document.querySelector("#telefono");
     const cedulaInput = document.querySelector("#cedula");
     const direccionInput = document.querySelector("#direccion");
     const formularioActualizarUsuario = document.querySelector(".formularioActualizarUsuario") 
     const rol = document.querySelector("#rol") 

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
         //Validacion de direccion 
         direccionInput.addEventListener("keydown",ValidarDireccion)

         //Validacion para no exitan espacios en blanco 
             nombre.addEventListener("keyup",ValidarEspaciosUsuarios)
             
             correoElectronicoInput.addEventListener("keyup",ValidarEspaciosUsuarios)
             cedulaInput.addEventListener("keyup",ValidarEspaciosUsuarios)
             telefonoInput.addEventListener("keyup",ValidarEspaciosUsuarios)
             direccionInput.addEventListener("keyup",ValidarEspaciosUsuarios)


     const usuariosPorId = await ObtenerUsuariosPorId(id)

    nombre.value = usuariosPorId.nombre;
    correoElectronicoInput.value = usuariosPorId.correo_electronico
    telefonoInput.value = usuariosPorId.telefono 
    cedulaInput.value = usuariosPorId.cedula
    direccionInput.value = usuariosPorId.direccion
    
    if(usuariosPorId.rol == 1){
       
       rol.value = 1

    }else{

        rol.value = 2
    }

    
    formularioActualizarUsuario.addEventListener('submit',(e)=>{
        e.preventDefault()
        let objeto =  ValidarRegistroActualizacion(e)
        
            if(objeto != false){
             objeto["rol"] = rol.value  
             if(password.value == ""){
             objeto["password"] = "manuel270905"
             }else{
                objeto["password"] = password.value
             }
             console.log(objeto)
             Put(id,objeto)
        
            }else{
        
              alert("Los campos no pueden quedar vacios")
            }

    })


}