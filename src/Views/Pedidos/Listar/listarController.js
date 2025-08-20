import { getPedidosPorFecha } from "../../../Helpers/Request/Pedidios"
import { Delete } from "../../../Helpers/Request/Pedidios"

export const listarController = async(queryParams = null) =>{
     
    const {fecha} = queryParams
    
     const pedidos = await getPedidosPorFecha(fecha)
     const  contenedorPadre = document.querySelector(".agregarCards")
     const rol  = localStorage.getItem("rol")

     console.log(pedidos);
     

     pedidos.forEach(pedido => {
        
        // Crear el contenedor principal
       const carta = document.createElement("div");
       carta.classList.add("carta", "carta--detallePedido");

      // Imagen
      const imagen = document.createElement("img");
     imagen.src = "/Images/Rectangle 30.png";
     imagen.classList.add("carta__imagen", "carta__imagen--añadir");
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
       const estado = document.createElement("p");
       estado.classList.add("carta__parrafo");
       estado.textContent = `Terminado: ${estadoPedido} `;
       carta.appendChild(estado);

       const contenedorBotones = document.createElement("div")
       contenedorBotones.classList.add("botonesCarta")
       carta.appendChild(contenedorBotones)
       
       if(rol != 1){

       const botonModificar = document.createElement("a")
       botonModificar.classList.add("botonesCarta__boton")
       botonModificar.textContent = "Modificar"
       botonModificar.href = `#pedidos/Modificar/id=${pedido.idPedido}`
       contenedorBotones.appendChild(botonModificar)
   
       const botonEliminar = document.createElement("a")
       botonEliminar.classList.add("botonesCarta__boton")
       botonEliminar.textContent = "Eliminar"
       botonEliminar.href = `id=${pedido.idPedido}`
        
       contenedorBotones.appendChild(botonEliminar)
      botonEliminar.addEventListener("click",(e)=>{
        e.preventDefault()
        
            let idEliminar = botonEliminar.href 
            let id =  idEliminar.replace("http://localhost:5173/id=" , "")
        
             Delete(id)
             
      })
    }
       // Fecha entrega
      const fechaEntrega = document.createElement("p");
      fechaEntrega.classList.add("carta__parrafo");
      fechaEntrega.textContent = `Fecha entrega: ${pedido.fechaEntrega}`;
      carta.appendChild(fechaEntrega);

       
 

        
       contenedorPadre.appendChild(carta)

       

     });

     

     
     

}