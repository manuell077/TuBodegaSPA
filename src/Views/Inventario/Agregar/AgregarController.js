import {ValidarLetras,ValidarNumeros,ValidarEspacios} from "../../../Helpers/Validacion/index.js"

export const AgregarController = () =>{
      
    const formulario = document.querySelector("#addProducto")
    
    formulario.addEventListener("submit",(e) =>{
        e.preventDefault()

        const formData  = new FormData(formulario)

      fetch("http://localhost:8080/Tu_Bodega/api/productos", {
      method: "POST",
      body: formData
    }).then(res => res.text())
      .then(data => alert("Respuesta: " + data))
      .catch(err => console.error("Error:", err));


    })
    
}