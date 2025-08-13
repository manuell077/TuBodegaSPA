import Swal from 'sweetalert2';
export const Post = (event,objeto) =>{
    event.preventDefault()

    fetch(`http://localhost:8080/Tu_Bodega/api/ventas`, { //Se realiza el fetch 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto) //Se serializa en un json 

    }).then(res => res.text().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
      if (res.ok) {
        alert("✅ Se ha realizado el registro correctamente"); //Si el servidor trae una respuesta de tipo "ok"
    } else {
        alert("❌ Ha ocurrido un error: " + texto); //Si devuelve cualquier otra respuesta como lo es error 500 o 404 entonces tirara un alert de error 
    }

    })).catch(err =>{
        console.log(err) //En caso de que en el fetch suceda un error 
    })


}


export const ObtenerUsuarios = (select) => {
    fetch("http://localhost:8080/Tu_Bodega/api/usuarios/rol2")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let nombreUsuario = localStorage.getItem('nombre');
                let cedula = localStorage.getItem('cedula');

                let opcion = document.createElement("option");
                opcion.value = cedula;
                opcion.textContent = "Nombre: " + nombreUsuario + " Cedula: " + cedula;
                opcion.selected = true;
                select.append(opcion);
            });
        })
        .catch(error => {
            console.error("Error al obtener usuarios:", error);
        });
};





export const ObtenerProductos = async (select,idSeleccionado) =>{

    await fetch("http://localhost:8080/Tu_Bodega/api/productos/estado1").then(response => response.json()).then(data =>{
         
        data.forEach(element => {
        
        let opcion = document.createElement("option")
         opcion.value = element.idProducto
         opcion.textContent = element.nombre
         opcion.setAttribute("data-precio",element.precio)
         
         
        if (element.idProducto === idSeleccionado) {
        opcion.selected = true;
        console.log(opcion)
         }
         select.append(opcion)
        });

})



}


export const ObtenerVentas = (fkUsuario) =>{
   
    return fetch(`http://localhost:8080/Tu_Bodega/api/ventas/usuario/${fkUsuario}`).then(response => response.json());

}

export const ObtenerVentasPorId = (id) =>{
    return fetch (`http://localhost:8080/Tu_Bodega/api/ventas/${id}`).then(response => response.json()).catch(error => { console.log(error)});
}

export const Put = (id,data) =>{
     fetch(`http://localhost:8080/Tu_Bodega/api/ventas/${id}`, { //Se realiza el fetch 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) //Se serializa en un json 

    }).then(res => res.text().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
      if (res.ok) {
        alert("✅ Se ha realizado la actualizacion correctamente"); //Si el servidor trae una respuesta de tipo "ok"
    } else {
        alert("❌ Ha ocurrido un error: " + texto); //Si devuelve cualquier otra respuesta como lo es error 500 o 404 entonces tirara un alert de error 
    }

    })).catch(err => console.error("Error:", err)); //Se  resuelve si el servidor trae una respuesta de tipo texto y despues se imprime lo que se obtiene por consola 
}


export const Delete = (id) =>{
    fetch(`http://localhost:8080/Tu_Bodega/api/ventas/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.text().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Se ha realizado la eliminacion correctamente',
            confirmButtonText: 'Aceptar'
             }); //Si el servidor trae una respuesta de tipo "ok"
      } else {
          Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text:  texto,
                    confirmButtonText: 'Aceptar'
                     }); //Si devuelve cualquier otra respuesta como lo es error 500 o 404 entonces tirara un alert de error 
      }
  
      })).catch(err => console.error("Error:", err))
}

export const ObtenerDeudores = () =>{
    return fetch (`http://localhost:8080/Tu_Bodega/api/ventas/deudores`).then(response => response.json()).catch(error => { console.log(error)});
}

