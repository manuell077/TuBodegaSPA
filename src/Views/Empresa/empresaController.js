import {ValidarCorreo, ValidarDireccion, ValidarEmpresa, ValidarEspacios, ValidarLetras, ValidarNit, ValidarNumeros, ValidarTelefono} from "../../Helpers/Validacion/index.js"

export const empresaController = () =>{

    console.log("Entre en empresa controller");
    

const formu = document.querySelector(".registroEmpresa")
const nit = document.querySelector("#nit")
const empresa = document.querySelector("#empresa")
const direccion = document.querySelector("#direccion")
const linea = document.querySelector("#lineaAtencion")
const correo = document.querySelector("#correo")


//Validacion de campos 
//Validacion de nit y que no ingrese letras 
nit.addEventListener("keydown",ValidarNumeros)
nit.addEventListener("keyup",ValidarNit)

empresa.addEventListener("keydown",ValidarLetras)
direccion.addEventListener("keydown",ValidarDireccion)
//Validaciones de numero y bloquea de letras
linea.addEventListener("keydown",ValidarNumeros)
linea.addEventListener("keyup",ValidarTelefono)
correo.addEventListener("keydown",ValidarCorreo)

//Validacion de espacios vacios 
nit.addEventListener("keyup",ValidarEspacios)
empresa.addEventListener("keyup",ValidarEspacios)
direccion.addEventListener("keyup",ValidarEspacios)
linea.addEventListener("keyup",ValidarEspacios)
correo.addEventListener("keyup",ValidarEspacios)


formu.addEventListener("submit",(e)=>{
     
    console.log("Entre en el submit")
    let objeto = ValidarEmpresa(e)

    if(objeto != false){
        post(e,objeto)
    }else{
        alert("❌Completa los campos correctamente")
    }

})

}