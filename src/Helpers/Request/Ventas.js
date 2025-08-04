
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


export const ObtenerUsuarios = (select) =>{

    fetch("http://localhost:8080/Tu_Bodega/api/usuario").then(response => response.json()).then(data =>{
         
        data.forEach(element => {
        
        let opcion = document.createElement("option")
         opcion.value = element.idUsuarios
         opcion.textContent = element.cedula
         select.append(opcion)
        });

})

}

export const ObtenerProductos = (select) =>{

    fetch("http://localhost:8080/Tu_Bodega/api/productos").then(response => response.json()).then(data =>{
         
        data.forEach(element => {
        
        let opcion = document.createElement("option")
         opcion.value = element.idProducto
         opcion.textContent = element.nombre
         opcion.setAttribute("data-precio",element.precio)
         select.append(opcion)
        });

})



}

