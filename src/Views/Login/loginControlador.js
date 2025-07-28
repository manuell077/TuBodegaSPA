import {post} from "../../Helpers/Request/PostLogin.js" //Se importa del metodo post

import {ValidarEspacios,ValidarCedula,ValidarPassword, ValidarLogin} from "../../Helpers/Validacion/index.js"


export const loginController = () =>{


const formu = document.querySelector(".login"); //Se seleccionana el formulario 
const cedula = document.querySelector("#cedula")
const password = document.querySelector("#contrasena")


//Validar que el campo cedula es valido y que no ingreso letras
cedula.addEventListener("keyup",ValidarCedula)

//Validar que el campo password tiene minimo 6 caracteres 
password.addEventListener("keydown",ValidarPassword)

//Validar que el campo no este en blanco 
cedula.addEventListener("keyup",ValidarEspacios)
password.addEventListener("keyup",ValidarEspacios)



formu.addEventListener("submit",(e)=>{
     
    
    
    let obejto = ValidarLogin(e)

    if(obejto != false ){
        
        post(e,obejto)
    }else{
         alert("❌Completa los campos correctamente")
    }
})




}