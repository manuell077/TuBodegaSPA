import { getPedidosId } from "../../../Helpers/Request/Pedidios";
import { ValidarPedidosModificar } from "../../../Helpers/Validacion/Validaciones";
import {put,get} from "../../../Helpers/Request/api.js";
import Swal from 'sweetalert2';

export const modificarPedidosController =async (queryParams = null) =>{
        
     const {id} = queryParams
         
          const pedidos = await get(`pedidos/modificar/${id}`)
          const  contenedorPadre = document.querySelector(".modificarPedidos")
          const botonModificar = document.querySelector(".modificarPedidos")
     
          console.log(pedidos);
          
     
          pedidos.forEach(pedido => {
             
             // Crear el contenedor principal
            const carta = document.createElement("div");
            carta.classList.add("carta", "carta--añadir");
     
           // Imagen
           const imagen = document.createElement("img");
          imagen.src = "/Images/Rectangle 30.png";
          imagen.classList.add("carta__imagen", "carta__imagen--modificar");
          carta.appendChild(imagen);
     
           // Cliente
           const cliente = document.createElement("p");
             cliente.classList.add("carta__parrafo");
             cliente.textContent = `Cliente: ${pedido.cliente}`;
             carta.appendChild(cliente);
     
           // Valor
             const valor = document.createElement("p");
             valor.classList.add("carta__parrafo");
             valor.textContent = `Valor: $${pedido.valor}`;
             carta.appendChild(valor);
           
             // Contenedor de productos
           const contenedorProductos = document.createElement("div");
          contenedorProductos.classList.add("cantidad", "cantidad--productos");
     
             const productos = pedido.productos.split("\n")
            
             productos.forEach((productos) =>{
     
             const producto = document.createElement("div");
             producto.classList.add("cantidad__circulo", "cantidad__circulo--producto");
             producto.textContent = productos;
             contenedorProductos.appendChild(producto);
             })
     
     
             
            carta.appendChild(contenedorProductos);
             
     
            let estadoPedido = ""
             if(pedido.terminado == false){
                  estadoPedido = "NO"
             }else{
                 estadoPedido = "SI"
             }
     
              

            
            // Estado
            const estadoDiv = document.createElement("div");
            estadoDiv.classList.add("componente" , "componente--cartas");

            const estadoLabel = document.createElement("label");
            estadoLabel.classList.add("componente__label","componente__label--cartas");
            estadoLabel.textContent = "Terminado:";

            const estadoSelect = document.createElement("select");
            estadoSelect.name = "terminado";
            estadoSelect.required = true;
            estadoSelect.classList.add("componente__entrada","componente__entrada--cartas");

            const opcionSi = document.createElement("option");
            opcionSi.value = "true";
            opcionSi.textContent = "Sí";

            const opcionNo = document.createElement("option");
            opcionNo.value = "false";
            opcionNo.textContent = "No";

            if (estadoPedido == "NO") {
            opcionNo.selected = true;
            } else {
            opcionSi.selected = true;
            }

            estadoSelect.appendChild(opcionSi);
            estadoSelect.appendChild(opcionNo);

            estadoDiv.appendChild(estadoLabel);
            estadoDiv.appendChild(estadoSelect);
            carta.appendChild(estadoDiv);

            // Fecha entrega
            const fechaDiv = document.createElement("div");
            fechaDiv.classList.add("componente" , "componente--cartas");

            const fechaLabel = document.createElement("label");
            fechaLabel.classList.add("componente__label","componente__label--cartas");
            fechaLabel.textContent = "Fecha entrega:";

            const fechaInput = document.createElement("input");
            fechaInput.type = "date";
            fechaInput.name = "fecha";
            fechaInput.required = true;
            fechaInput.value = pedido.fechaEntrega;
            fechaInput.classList.add("componente__entrada","componente__entrada--cartas");

            fechaDiv.appendChild(fechaLabel);
            fechaDiv.appendChild(fechaInput);
            carta.appendChild(fechaDiv);

            contenedorPadre.prepend(carta);
     
     
     
          });

    botonModificar.addEventListener("submit",async(e)=>{
        

         e.preventDefault()

         
        let objeto = ValidarPedidosModificar(e)
         
         console.log(objeto);
         

        if(objeto != false){
            try{
         const respuesta = await  put(`pedidos/${id}`,objeto)
            
         await Swal.fire({
                                                icon: 'success',
                                                title: '¡Éxito!',
                                                text: respuesta.message,
                                                confirmButtonText: 'Aceptar'
                                            });
                                        } catch(e){
                                            console.error(e)
                                        }

        }else{
            await Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Tienes que completar todos los campos',
                            confirmButtonText: 'Aceptar'
                        });
        }

    })



}