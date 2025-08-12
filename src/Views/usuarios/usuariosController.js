import { ObtenerTodosUsuarios } from "../../Helpers/Request/Usuarios";
import { Delete } from "../../Helpers/Request/Usuarios";

export const usuariosController = async() =>{

    const cedula = localStorage.getItem('cedula')
     
    const usuarios = await ObtenerTodosUsuarios(cedula)
    
    const container = document.querySelector('.usuarios-container')

    usuarios.forEach((usuario, index) => {

            const card = document.createElement("div");
            card.classList.add("usuario-card");

            const info = document.createElement("div");
            info.classList.add("usuario-info");
            
            
            let rolReal = ""
            
            if(usuario.rol == 2){

                rolReal = "EMPLEADO"
            }else{
               rolReal = "ADMINISTRADOR"
            }


            const nombre = document.createElement("p");
            nombre.innerHTML = `<strong>Nombre:</strong> ${usuario.nombre}`;
            const cedula = document.createElement("p");
            cedula.innerHTML = `<strong>Cédula:</strong> ${usuario.cedula}`;
            const rol = document.createElement("p");
            rol.innerHTML = `<strong>Rol:</strong> ${rolReal}`;

            info.appendChild(nombre);
            info.appendChild(cedula);
            info.appendChild(rol);

            const botones = document.createElement("div");
            botones.classList.add("usuario-botones");

            const btnEliminar = document.createElement("a");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.classList.add("btn-eliminar");
            btnEliminar.href = `id=${usuario.cedula}`

             btnEliminar.addEventListener("click",(e)=>{
                
                e.preventDefault()
            
                let idEliminar = btnEliminar.href 
                let id =  idEliminar.replace("http://localhost:5173/id=" , "")
            
                 Delete(id)
                 
              })

            const btnModificar = document.createElement("a");
            btnModificar.textContent = "Modificar";
            btnModificar.classList.add("btn-modificar");
            btnModificar.href = `#usuarios/Modificar/id=${usuario.cedula}`
            btnModificar.onclick = () => modificarUsuario(index);

            botones.appendChild(btnEliminar);
            botones.appendChild(btnModificar);

            card.appendChild(info);
            card.appendChild(botones);

            container.appendChild(card);
       
    
    })

}