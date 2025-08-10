export const traerPedidos = () =>{

    
    
     return fetch('http://localhost:8080/Tu_Bodega/api/pedidos').then(response => response.json());
    

}

export const traerValorVenta = (id) =>{
     
    return fetch(`http://localhost:8080/Tu_Bodega/api/pedidos/pedidoVenta/${id}`).then(response => response.json());
}

export function post(event,data){ //Recibe como parametros el evento y el formulario

    event.preventDefault() //Evitara que se envie el formulario 
    
    

        fetch(`http://localhost:8080/Tu_Bodega/api/factura`, { //Se realiza el fetch 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) //Se serializa en un json 

    }).then(res => res.text().then(texto=>{ //Se convierte en texto la respuesta que nos trae el servidor y al ser una promesa la resolvemos con then 
      if (res.ok) {
        alert("✅ Se ha realizado el registro correctamente"); //Si el servidor trae una respuesta de tipo "ok"
    } else {
        alert("❌ Ha ocurrido un error: " + texto); //Si devuelve cualquier otra respuesta como lo es error 500 o 404 entonces tirara un alert de error 
    }

    })).catch(err => console.error("Error:", err)); //Se  resuelve si el servidor trae una respuesta de tipo texto y despues se imprime lo que se obtiene por consola 
  
}

export function obtenerFacturaCompleta  (id) {

    return fetch(`http://localhost:8080/Tu_Bodega/api/factura/${id}`).then(response => response.json());
}