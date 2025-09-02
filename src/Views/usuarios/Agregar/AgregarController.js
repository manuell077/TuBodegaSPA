import {postAutenticado,get} from "../../../Helpers/Request/api.js" //Se importa el metodo post del archivo barril
import {ValidarRegistro, ValidarLetras,ValidarEspacios, ValidarPasswordUsuarios, ValidarRepeticionUsuarios, ValidarCorreoUsuarios, ValidarNumeros, validarEspaciosDireccionUsuarios,ValidarCedulaUsuarios, ValidarTelefonoUsuarios, ValidarEspaciosUsuarios} from "../../../Helpers/Validacion/index.js"
import Swal from 'sweetalert2';



export const agregarUsuariosController = async () =>{
    const formu = document.querySelector(".registrarme") //Se selecciona el formulario 
    const nombre = document.querySelector("#nombre") //Se selecciona el input con el id nombre 
    const password = document.querySelector("#contrasena") //Se selecciona el input con el id de contraseña
    const Repeatpassword = document.querySelector("#repetirContrasena") //Se selecciona el input con el id de Repetir contraseña
    const correo =  document.querySelector("#correoElectronico") //Se selecciona el input con el id de correo
    const telefono = document.querySelector("#telefono") //Se selecciona el input con el id del telefono
    const cedula = document.querySelector("#cedula") //Se selecciona el input con el id de la cedula
    const municipio = document.querySelector("#municipio")
    
    
    
    
    
    
             //Validacion para que el usuario escriba solo letras 
             nombre.addEventListener("keydown",ValidarLetras)
             //Validacion donde el usuario solo va a escribir letras ,numeros y minimo van a ser 6 caracteres
             
             password.addEventListener("blur",ValidarPasswordUsuarios)
             Repeatpassword.addEventListener("blur",(e)=>{ValidarRepeticionUsuarios(Repeatpassword,password)})
             
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
    
    

              calle.addEventListener("keyup",(e)=>{validarEspaciosDireccionUsuarios(calle,numero,barrio)})
              numero.addEventListener("keyup",(e)=>{validarEspaciosDireccionUsuarios(calle,numero,barrio)})
              barrio.addEventListener("keyup",(e)=>{validarEspaciosDireccionUsuarios(calle,numero,barrio)})

    
    //Utilizo mas que todo el evento keyUp en vampos donde tengo que tener cantidades exactas por ejemplo en numero de telefono es 10 caracteres y en repetir la contraseña tiene que ser exactamente a la contraseña original
    
    
    //Validacion para no exitan espacios en blanco 
    nombre.addEventListener("keyup",ValidarEspaciosUsuarios)
    password.addEventListener("keyup",ValidarEspaciosUsuarios)
    Repeatpassword.addEventListener("keyup",ValidarEspaciosUsuarios)
    correo.addEventListener("keyup",ValidarEspaciosUsuarios)
    cedula.addEventListener("keyup",ValidarEspaciosUsuarios)
    telefono.addEventListener("keyup",ValidarEspaciosUsuarios)
    

   const muni = await  get('usuarios/municipiosAutenticados')
    
   muni.forEach(element => {
    const opcion = document.createElement("option")
        opcion.value = element.idMunicipio
        opcion.textContent = element.nombreMunicipio
        municipio.appendChild(opcion)
});
    
    
    
    formu.addEventListener("submit",async (e) =>  {
         
      e.preventDefault()
    
      let objeto =   ValidarRegistro(e)
        
      if(objeto != false){
        try{
       const respuesta = await postAutenticado(`usuarios/registro-admin`,objeto)
       
       if(respuesta.mensaje){
       await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: respuesta.mensaje ||  "Usuario registrado correctamente",
        confirmButtonText: 'Aceptar'
        });
      } 
      }catch(e){
         console.log("Error")
      }
         
    
      }else{
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tienes que completar todos los campos',
          confirmButtonText: 'Aceptar'
           });
      }
      
    
    }) 
    }

