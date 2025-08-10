export const traerEmpresas = () =>{

    return fetch('http://localhost:8080/Tu_Bodega/api/empresas').then(response => response.json());
}

export function put(id,data){
     fetch(`http://localhost:8080/Tu_Bodega/api/empresas/${id}`, { //Se realiza el fetch 
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