import Swal from 'sweetalert2';
export const  Get =  () =>{
    
     return fetch('http://localhost:8080/Tu_Bodega/api/productos').then(response => response.json());
    
}

export const GetID = (id) =>{
     
     return fetch (`http://localhost:8080/Tu_Bodega/api/productos/${id}`).then(response => response.json()).catch(error => { console.log(error)});
     
}

export function put(id,data){ //Recibe como parametros el evento y el formulario

        fetch(`http://localhost:8080/Tu_Bodega/api/productos/${id}`, { //Se realiza el fetch 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) //Se serializa en un json 

    }).then(res => res.text().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
      if (res.ok) {
        Swal.fire({
                             icon: 'success',
                             title: '¡Éxito!',
                             text: 'Se ha realizado la actualizacion correctamente',
                             confirmButtonText: 'Aceptar'
          });
    } else {
        alert("❌ Ha ocurrido un error: " + texto); //Si devuelve cualquier otra respuesta como lo es error 500 o 404 entonces tirara un alert de error 
    }

    })).catch(err => console.error("Error:", err)); //Se  resuelve si el servidor trae una respuesta de tipo texto y despues se imprime lo que se obtiene por consola 
  
}


export function Delete(id){

    fetch(`http://localhost:8080/Tu_Bodega/api/productos/${id}`, {
    method: 'DELETE',
  })
  .then(response => {

    console.log(response)
    if (response.ok) {
      alert('✅ La eliminación se ha realizado correctamente');
      // Puedes recargar o actualizar la vista aquí si deseas
    } else if(response.status == 400){

      alert('❌ No se puede eliminar un producto cuando tiene una venta asociada');
    }else{
      alert('⚠️ Error inesperado al intentar eliminar el producto');

    }
  })
  .catch(error => {
    console.error('Error de red:', error);
  });
}