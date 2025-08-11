export const controlador = () =>{
    
    console.log("Controlador")

    const usuario = document.querySelector(".perfil__texto")
    
    let Nombreusuario = localStorage.getItem('nombre')

    usuario.textContent = Nombreusuario
      
}