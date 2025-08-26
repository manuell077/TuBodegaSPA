import {ValidarLetras,ValidarNumeros,ValidarEspaciosInventario ,ValidarInventarioAgregar} from "../../../Helpers/Validacion/index.js"
import Swal from 'sweetalert2';
export const AgregarController = () =>{
      
    const formulario = document.querySelector("#addProducto")
    const inputImagen = document.querySelector('#imagen');
    const inputNombre = document.querySelector('#nombre');
    const inputPeso = document.querySelector('#peso');
    const inputCantidad = document.querySelector('#cantidad');
    const inputPrecio = document.querySelector('#precio');
    
    inputImagen.addEventListener('change',(e)=>{
        const file  = this.file[0]
        if(file && !file.type.startsWith('image/') ){
           Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Tienes que seleccionar una imagen",
                confirmButtonText: 'Aceptar'
            });
            this.value = ""
        }
    })

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

        try {
            const res = await fetch("http://localhost:8080/Tu_Bodega/api/productos", {
                method: "POST",
                body: formData
            });
             const data = await res.text();
            // Aquí validamos el código de respuesta
            if (!res.ok) {
                throw new Error(data);
            }

            

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se agregó producto',
                confirmButtonText: 'Aceptar'
            });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Ha sucedido un error: " + err.message,
                confirmButtonText: 'Aceptar'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Tienes que completar todos los campos",
            confirmButtonText: 'Aceptar'
        });
    }

    
    


    
    })}
