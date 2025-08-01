import './Styles/style.css'
import {router,recorrerRutas} from './Routers/router.js'
import {routers} from './Routers/routes.js'
 

const app = document.querySelector("#app"); 
const gridContainer = document.querySelector('.grid-container')
const sidebar = document.querySelector('.sidebar')


const cargarVistasPrivadas = async () =>{
    
    if(!sidebar.innerHTML.trim()){
       const response  = await fetch ('./src/Componentes/sidebar.html')
       const  sidebarHtml = await response.text()
       sidebar.innerHTML = sidebarHtml

    }

}


const cargar = () =>{
     
  const hash = location.hash.slice(1);
    
   const [rutasEncontradas,parametros]  = recorrerRutas(routers,hash)
  
   
  
    if(rutasEncontradas.private == true){
       
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


