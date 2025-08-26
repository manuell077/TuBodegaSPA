import Swal from 'sweetalert2';
export function post(event,objeto){ //Recibe como parametros el evento y el formulario

    event.preventDefault() //Evitara que se envie el formulario 
    

        fetch(`http://localhost:8080/Tu_Bodega/api/usuarios/registro`, { //Se realiza el fetch 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto) //Se serializa en un json 

    }).then(res => res.json().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
      if (res.ok) {
        Swal.fire({
  icon: 'success',
  title: '¡Éxito!',
  text: 'Se ha realizado el registro correctamente',
  confirmButtonText: 'Aceptar'
   });
    } else {
        
        throw new Error(texto.error)
    }

    })).catch(err =>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:  err,
          confirmButtonText: 'Aceptar'
           });
    })
          

}

export function TraerMunicicpios () {

     return fetch('http://localhost:8080/Tu_Bodega/api/usuarios/municipios').then(response => response.json());
         
}