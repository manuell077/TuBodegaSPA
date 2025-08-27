import { routers } from "./routes.js"
import Swal from 'sweetalert2';

export const router = async (elemento) => {
    const hast = location.hash.slice(1);
    const [ruta,parametros] = recorrerRutas(routers, hast);

    

    await cargarVista(ruta.path, elemento )  
    await ruta.controller(parametros)

    
}

export const recorrerRutas = (routers, hast) => {
    
     const hasts =   hast.split("/") //El hash que obtuvo lo convierte en un arreglo utilizando como separador el "/"
     
     console.log(hasts);
     

     let parametros = {} 

     if(hasts.length === 3 && hasts[2].includes("=")){
         
        parametros = extraerParametros(hasts[2])
        hasts.pop()    
         
     }

    if(hasts[0]=="")return [routers.bienvenida  ,parametros] //Si la primera posicion del hash  separado por /  es "" retornamos la vista empresa 
    
    
    for (const key in routers) { //Recorremos las rutas 
        
       
        
        
        if (key == hasts[0]) {  //Si la llave es igual a la posicion 0 del hast entrara a hacer la siguiente linea de codigo  
           
            

          
           for(const url  in routers[key]){ //Ciclo for que recorre en las rutas de la key 
                 
                
                
            if(typeof routers[key][url] == "object"){ //Evalua si el valor es de tipo objeto 
                
                    if(hasts.length==1){ //Si la longitud es de 1 entonces retornara lo siguiente 
                        
                        return  [routers[key]["/"],parametros]
                    }
                    else{  //De caso contrario retornara el hast[1]      
                         
                         
                        return [routers[key][hasts[1]],parametros]
                    }

            }else{ //Retornara el router con su  key en caso contrario 
                
                return [routers[key],parametros]
            }

           }
           
           return [routers[key],parametros]
        }
    }

    return "";    
}

// Extrae un objeto clave-valor desde un string de parámetros tipo "id=1&modo=editar"
const extraerParametros = (parametros) => {
  const pares = parametros.split("&");
  const params = {};
  pares.forEach(par => {
    const [clave, valor] = par.split("=");
    params[clave] = valor;
  });
  return params;
};

const cargarVista = async (path, elemento) => {

    
    const seccion = await fetch(`./src/views/${path}`);
    if (!seccion.ok) throw new Error("No pudimos leer el archivo");
    const html = await seccion.text();
    elemento.innerHTML =  html;
    
 }