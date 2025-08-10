import { traerEmpresas } from "../../Helpers/Request/EMPRESA.JS";
import { ValidarEmpresa } from "../../Helpers/Validacion/Validaciones";
import { put } from "../../Helpers/Request/empresa.js"

export const empresaModificarController = async() =>{
const nitInput = document.querySelector('#nit');
const empresaInput = document.querySelector('#empresa');
const direccionInput = document.querySelector('#direccion');
const lineaAtencionInput = document.querySelector('#lineaAtencion');
const correoInput = document.querySelector('#correo');
const formulario = document.querySelector(".registroEmpresa")    
let datos = await traerEmpresas()

    nitInput.value = datos[0].nit
    empresaInput.value = datos[0].nombreEmpresa
    direccionInput.value = datos[0].direccion
    lineaAtencionInput.value = datos[0].lineaDeAtencion
    correoInput.value = datos[0].correoEmpresa

    formulario.addEventListener('submit',(e)=>{
        let objeto = ValidarEmpresa(e)

        if(objeto != false){
           
            put(datos[0].nit,objeto)
         
        }else{
         
            alert("Tienes que completar todos los campos")

        }
    })
       
}