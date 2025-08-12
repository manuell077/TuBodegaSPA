export function post(event,data){ //Recibe como parametros el evento y el formulario

    event.preventDefault() //Evitara que se envie el formulario 
    
    

        fetch(`http://localhost:8080/Tu_Bodega/api/pedidos`, { //Se realiza el fetch 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) //Se serializa en un json 

    }).then(res => res.text().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
      if (res.ok) {
        alert("✅ Se ha registrado el pedido correctamente"); //Si el servidor trae una respuesta de tipo "ok"
    } else {
        alert("❌ Ha ocurrido un error: " + texto); //Si devuelve cualquier otra respuesta como lo es error 500 o 404 entonces tirara un alert de error 
    }

    })).catch(err => console.error("Error:", err)); //Se  resuelve si el servidor trae una respuesta de tipo texto y despues se imprime lo que se obtiene por consola 
  
}

export function getPedidosNoTemrinados(){

    return fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/no-terminados-por-fecha`).then(response => response.json()).catch(error => { console.log(error)});

}

export function getPedidosPorFecha(fecha){
    
    return fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/por-fecha/${fecha}`).then(response => response.json()).catch(error => { console.log(error)});
}

export function getPedidosId(id){

     return fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/modificar/${id}`).then(response => response.json()).catch(error => { console.log(error)});
}

export function put(id,data){
     fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/${id}`, { //Se realiza el fetch 
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

export function getPedidosTerminados(){
     return fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/terminados-fecha`).then(response => response.json()).catch(error => { console.log(error)});
}

export function Delete(id){

    fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      console.log('Producto eliminado correctamente');
      // Puedes recargar o actualizar la vista aquí si deseas
    } else {
      console.error('Error al eliminar el producto');
    }
  })
  .catch(error => {
    console.error('Error de red:', error);
  });
}

export const ObtenerVentasSinPedido = async (select,id) =>{

    await fetch(`http://localhost:8080/Tu_Bodega/api/ventas/sin-pedido/${id}`).then(response => response.json()).then(data =>{
         
        data.forEach(element => {
        
        let opcion = document.createElement("option")
         opcion.value = element.idVenta
         opcion.textContent = "Venta " + element.idVenta
    
        
         select.append(opcion)
        });

})



}

