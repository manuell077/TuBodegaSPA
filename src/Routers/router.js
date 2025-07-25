import { routers } from "./routes"

export const router = async (elemento) =>{
    
    const hash = location.hash.slice(1) //Obtenemos el hash en el que estamos

   

    let arregloHash = hash.split("/"); //Se crea un arreglo utilizando como separador el "/"
    console.log(arregloHash)

    const [ruta, parametros] = recorrerRutas(routers, arregloHash); //Recorremos las rutas  y las destructuramos en ruta y parametros 
    
    
    if(!ruta) {
        elemento.innerHTML = `<h2>Ruta no encontrada</h2>`;
        return;
    }
    
    if(ruta.private && !await isAuth()){
        location.hash = "#/login";
        return;
    }

    await cargarVista(ruta.path, elemento)  
    await ruta.controller(parametros);

}

const  recorrerRutas = (routers,arregloHash) =>{ //Ponemos como parametros las routes
    
     let parametros = {}; //Cremaos un objeto 

    for (const key in routers) { //Recorremos las rutas
         
        console.log("key " + key)

        //Evaluamos segun su longitud del objeto 

        if (arregloHash.length == 4){
            let parametrosSeparados = arregloHash[3].split("&");

            parametrosSeparados.forEach((parametro) => {
                let claveValor = parametro.split("=");
                
                parametros[claveValor[0]] = claveValor[1];
            });
            
            
            arregloHash.pop();
        }

        if (arregloHash.length == 1 && arregloHash[0] == "") {
            console.log(routers[key])
            return [routers[key], parametros];
        }

        if (key == arregloHash[1]) { 
            for(const elemento in routers[key]){
                
                
                if(typeof routers[key][elemento] == "object"){
                    
                    return arregloHash.length == 2 ? 
                        [routers[key][elemento], parametros] :
                        [routers[key][arregloHash[2]], parametros];
                }
            }
            return [routers[key], parametros];            
        }
    }
    return null;


}

const cargarVista = async (path, elemento) => {
    console.log(path, elemento);
    const seccion = await fetch(`./src/views/${path}`);
    if (!seccion.ok) throw new Error("No pudimos leer el archivo");
    const html = await seccion.text();
    elemento.innerHTML =  html;
}