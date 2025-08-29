import {post,TraerMunicicpios} from "../../Helpers/Request/PostRegistarme.js" //Se importa el metodo post del archivo barril
import {ValidarRegistro, ValidarLetras,ValidarEspacios, ValidarPassword, ValidarRepeticion, ValidarCorreo, ValidarNumeros, ValidarDireccion,ValidarCedula, ValidarTelefono, ValidarSeleccioandor,validarEspaciosDireccion} from "../../Helpers/Validacion/index.js"
import Swal from 'sweetalert2';

export const registroController = async() =>{

const formu = document.querySelector(".registrarme") //Se selecciona el formulario 
const nombre = document.querySelector("#nombre") //Se selecciona el input con el id nombre 
const password = document.querySelector("#contrasena") //Se selecciona el input con el id de contraseña
const Repeatpassword = document.querySelector("#repetirContrasena") //Se selecciona el input con el id de Repetir contraseña
const correo =  document.querySelector("#correoElectronico") //Se selecciona el input con el id de correo
const telefono = document.querySelector("#telefono") //Se selecciona el input con el id del telefono
const cedula = document.querySelector("#cedula") //Se selecciona el input con el id de la cedula
const municipioSelect = document.querySelector("#municipio")
const calle = document.querySelector("#calle")
const numero = document.querySelector("#numero")
const barrio = document.querySelector("#barrio")  

const menuHmaburgueso = document.querySelector(".iconoHamburguesa")
menuHmaburgueso.classList.add("displayNone")

//Validacion para que el usuario escriba solo letras 
nombre.addEventListener("keydown",ValidarLetras)
//Validacion donde el usuario solo va a escribir letras ,numeros y minimo van a ser 6 caracteres
password.addEventListener("keyup",ValidarPassword)
//Validacion donde se valida si las dos contraseñas son iguales
Repeatpassword.addEventListener("keyup",(e)=>{ValidarRepeticion(Repeatpassword,password)})
//Validacion donde se valida si cumple con una sintaxis de correo correcta
correo.addEventListener("keydown",ValidarCorreo)
//Validacion para que solo ingrese digitos
cedula.addEventListener("keydown",ValidarNumeros)
//Validacion para que ingrese una cedula de 8 a 10 digitos
cedula.addEventListener("keyup",ValidarCedula)
//Validacion que solo permite que se ingrese numeros  
telefono.addEventListener("keydown",ValidarNumeros)
//Validacion que ingrese un numero valido 
telefono.addEventListener("keyup",ValidarTelefono)
//validacion de calle para que solo ingrese numeros
calle.addEventListener("keydown",ValidarNumeros)
//validacion de barrio para que solo ingrese texto
barrio.addEventListener("keydown",ValidarLetras)


//Utilizo mas que todo el evento keyUp en vampos donde tengo que tener cantidades exactas por ejemplo en numero de telefono es 10 caracteres y en repetir la contraseña tiene que ser exactamente a la contraseña original


//Validacion para no exitan espacios en blanco 
nombre.addEventListener("keyup",ValidarEspacios)
password.addEventListener("keyup",ValidarEspacios)
Repeatpassword.addEventListener("keyup",ValidarEspacios)
correo.addEventListener("keyup",ValidarEspacios)
cedula.addEventListener("keyup",ValidarEspacios)
telefono.addEventListener("keyup",ValidarEspacios)


calle.addEventListener("keyup",(e)=>{validarEspaciosDireccion(calle,numero,barrio)})
numero.addEventListener("keyup",(e)=>{validarEspaciosDireccion(calle,numero,barrio)})
barrio.addEventListener("keyup",(e)=>{validarEspaciosDireccion(calle,numero,barrio)})

const municicpios = await TraerMunicicpios()

municicpios.forEach(element => {
    const opcion = document.createElement("option")
        opcion.value = element.idMunicipio
        opcion.textContent = element.nombreMunicipio
        municipioSelect.appendChild(opcion)
});




formu.addEventListener("submit", (e) =>  {
     
  e.preventDefault()

  let objeto =   ValidarRegistro(e)
    
  if(objeto != false){
    
    console.log(objeto)
    post(e,objeto)
     

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