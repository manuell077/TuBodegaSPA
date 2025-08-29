import { get } from "../../Helpers/Request/api.js";
import { ValidarEmpresa, ValidarNumeros , ValidarLetras } from "../../Helpers/Validacion/Validaciones";
import { put } from "../../Helpers/Request/api.js"
import Swal from 'sweetalert2';

export const empresaModificarController = async() =>{
const nitInput = document.querySelector('#nit');
const empresaInput = document.querySelector('#empresa');
const calle = document.querySelector('#calle');
const numero = document.querySelector('#numero');
const barrio = document.querySelector('#barrio')
const lineaAtencionInput = document.querySelector('#lineaAtencion');
const correoInput = document.querySelector('#correo');
const formulario = document.querySelector(".registroEmpresa")    
const municipio = document.querySelector('#municipio')
let datos = await get('empresas')
    
console.log(datos)
    nitInput.value = datos[0].nit
    empresaInput.value = datos[0].nombreEmpresa
    lineaAtencionInput.value = datos[0].lineaDeAtencion
    correoInput.value = datos[0].correoEmpresa
    calle.value = datos[0].dire.calle
    numero.value = datos[0].dire.numero
    barrio.value = datos[0].dire.barrio

    const muni = await  get('usuarios/municipiosAutenticados')
    
   muni.forEach(element => {
    const opcion = document.createElement("option")
        opcion.value = element.idMunicipio
        opcion.textContent = element.nombreMunicipio
        if (element.idMunicipio === datos[0].dire.municipio.idMunicipio) {
        opcion.selected = true;
    }
        municipio.appendChild(opcion)
});

    nitInput.addEventListener("keydown",ValidarNumeros)
    empresaInput.addEventListener("keydown",ValidarLetras)
    lineaAtencionInput.addEventListener("keydown",ValidarNumeros)
    
    
    

    formulario.addEventListener('submit',async(e)=>{
        let objeto = ValidarEmpresa(e)

        if(objeto != false){
            
           objeto["direccion"] = datos[0].direccion
           
           try{
           const respuesta =await  put(`empresas/${nitInput.value}`,objeto)
           
           await Swal.fire({
                                icon: 'success',
                                title: '¡Éxito!',
                                text: respuesta.mensaje,
                                confirmButtonText: 'Aceptar'
                                });
                          location.reload
                            }catch(e){
                                console.log(e);
                                
                            }              
        }else{
         
           await  Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Tienes que completar todos los campos',
                            confirmButtonText: 'Aceptar'
                             });

        }
    })
       
}