import './Styles/style.css'
import {router,recorrerRutas} from './Routers/router.js'
import {routers} from './Routers/routes.js'
 

const app = document.querySelector("#app"); 
const gridContainer = document.querySelector('.grid-container')
const sidebar = document.querySelector('.sidebar')

const usuario = document.querySelector(".perfil__texto")


const cargarVistasPrivadas = async () =>{
          
    const rol = localStorage.getItem('rol')
    


    if(rol == 2){
       const response  = await fetch ('./src/Componentes/sidebar.html')
       const  sidebarHtml = await response.text()
       sidebar.innerHTML = sidebarHtml
        
      const usuario = document.querySelector(".perfil__texto");
      usuario.textContent = "EMPLEADO";
      usuario.addEventListener("click", () => {
        location.hash = "#login"; // Cambia el hash
    });
       
    }else{
       const response  = await fetch ('./src/Componentes/sidebarAdmin.html')
       const  sidebarHtml = await response.text()
       sidebar.innerHTML = sidebarHtml
       const usuario = document.querySelector(".perfil__texto")
       usuario.textContent = "ADMIN"
       usuario.addEventListener("click", () => {
        location.hash = "#login"; // Cambia el hash
    });
       
    }

}


const cargar = () =>{
     
  const hash = location.hash.slice(1);
    

   const [rutasEncontradas,parametros]  = recorrerRutas(routers,hash)
   

   console.log("Hash" + hash) 
  
    if(rutasEncontradas.private == true && hash != "perfil" ){
       
      gridContainer.classList.add('layout')
      sidebar.classList.add('paddinDiez')
      cargarVistasPrivadas()
      
    }else{
      gridContainer.classList.remove('layout')
      sidebar.classList.remove('paddinDiez')
      sidebar.innerHTML = ""

    }
   
    router(app)

}



window.addEventListener('DOMContentLoaded', async () => {
  cargar()
});

window.addEventListener('hashchange', async () =>{
  cargar()
})


