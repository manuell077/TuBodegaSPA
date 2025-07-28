export const  Get =  () =>{
    
     return fetch('http://localhost:8080/Tu_Bodega/api/productos').then(response => response.json());
    
}