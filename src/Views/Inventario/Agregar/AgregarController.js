import {ValidarLetras,ValidarNumeros,ValidarEspaciosInventario ,ValidarInventarioAgregar} from "../../../Helpers/Validacion/index.js"
import { post_imgs } from "../../../Helpers/Request/api.js";
import Swal from 'sweetalert2';
export const AgregarController = () =>{
      
    const formulario = document.querySelector("#addProducto")
    const inputImagen = document.querySelector('#imagen');
    const inputNombre = document.querySelector('#nombre');
    const inputPeso = document.querySelector('#peso');
    const inputCantidad = document.querySelector('#cantidad');
    const inputPrecio = document.querySelector('#precio');
    
    

    inputNombre.addEventListener("keydown",ValidarLetras)
    inputPeso.addEventListener("keydown",ValidarNumeros)
    inputCantidad.addEventListener("keydown",ValidarNumeros)
    inputPrecio.addEventListener("keydown",ValidarNumeros)
  
    inputImagen.addEventListener("keyup",ValidarEspaciosInventario)
    inputNombre.addEventListener("keyup",ValidarEspaciosInventario)
    inputPeso.addEventListener("keyup",ValidarEspaciosInventario)
    inputCantidad.addEventListener("keyup",ValidarEspaciosInventario)
    inputPrecio.addEventListener("keyup",ValidarEspaciosInventario)

    formulario.addEventListener("submit",async(e) =>{
        e.preventDefault()
     
        let objeto = ValidarInventarioAgregar(e)
       
       if(objeto != false){

       const formData = new FormData(formulario);

        
     const respuesta = await post_imgs(formData)
            
            await Swal.fire({
      icon: "success",
      title: "Producto registrado",
      text: respuesta.message,
      confirmButtonText: "Aceptar"
    });
       
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Tienes que completar todos los campos",
            confirmButtonText: 'Aceptar'
        });
    }

    
    


    
    })}
