import { ObtenerTodosUsuarios } from "../../Helpers/Request/Usuarios";
import { eliminar ,get} from "../../Helpers/Request/api.js";
import Swal from 'sweetalert2';
export const usuariosController = async() =>{

    const cedula = localStorage.getItem('cedula')
     
    console.log("Cedula" + cedula)
    const usuarios = await get(`usuarios/excepto/${cedula}`)
    console.log(usuarios)
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

             btnEliminar.addEventListener("click",async(e)=>{
                
                e.preventDefault()
            
                let idEliminar = btnEliminar.href 
                let id =  idEliminar.replace("http://localhost:5173/id=" , "")
            
                const eliminacion = await   eliminar(`usuarios/${id}`)
                 if(eliminacion.mensaje){
                 Swal.fire({
                     title: '¿Estás seguro?',
                     text: "Eliminaras un usuario ",
                     icon: 'warning',
                     showCancelButton: true,
                     confirmButtonColor: '#3085d6',
                     cancelButtonColor: '#d33',
                     confirmButtonText: 'Sí, eliminar',
                     cancelButtonText: 'Cancelar'
                   }).then((result) => {
                     if (result.isConfirmed) {
                    
                 
                       // Alerta de confirmación
                       Swal.fire(
                         'Eliminacion de usuario',
                         'Has eliminado correctamente.',
                         'success'
                       )
                     }
                   })}
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