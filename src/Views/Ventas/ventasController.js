import { ObtenerVentas } from "../../Helpers/Request/Ventas.js";
import { Delete } from "../../Helpers/Request/Ventas.js";
import { ValidarEspacios, ValidarLetras } from "../../Helpers/Validacion/Validaciones.js";

export const ventasController = async() =>{
  

  const contenedorVentas = document.querySelector(".agregarCards")  
  const ventasObtenidas = await ObtenerVentas()
  
  console.log(ventasObtenidas)

  ventasObtenidas.forEach(venta =>{
  const card = document.createElement('div');
  card.classList.add('carta', 'carta--venta');

  const titulo = document.createElement('p');
  titulo.classList.add('carta__venta');
  titulo.textContent = `VENTA N° ${venta.idVenta}`;

  const cliente = document.createElement('p');
  cliente.classList.add('carta__parrafo');
  cliente.textContent = `Cliente: ${venta.nombreCliente}`;

  const valor = document.createElement('p');
  valor.classList.add('carta__parrafo');
  valor.textContent = `Valor: $${venta.valor}`;

  const abonado = document.createElement('p');
  abonado.classList.add('carta__parrafo');
  abonado.textContent = `Abonado: $${venta.cantidadAbonado}`;

  // Cantidad
  const cantidadContainer = document.createElement('div');
  cantidadContainer.classList.add('cantidad', 'cantidad--productos');

  const cantidadLabel = document.createElement('p');
  cantidadLabel.classList.add('cantidad__parrafo');
  cantidadLabel.textContent = 'Cantidad:';

  cantidadContainer.appendChild(cantidadLabel);

  venta.productos.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('cantidad__circulo', 'cantidad__circulo--producto');
    console.log(producto.cantidad)
    console.log(producto.descripcion)
    divProducto.textContent = `${producto.cantidad} Canastillas ${producto.nombre}`;
    cantidadContainer.appendChild(divProducto);
  });

  const hora = document.createElement('p');
  hora.classList.add('carta__parrafo');
  hora.textContent = `Hora: ${venta.fechaHora}`;


  const contenedorBotones = document.createElement("div")
  contenedorBotones.classList.add("botonesCarta")
  
   
  const botonModificar = document.createElement("a")
  botonModificar.classList.add("botonesCarta__boton")
  botonModificar.textContent = "Modificar"
  botonModificar.href = `#ventas/Modificar/id=${venta.idVenta}`
  contenedorBotones.appendChild(botonModificar)
   
  const botonEliminar = document.createElement("a")
  botonEliminar.classList.add("botonesCarta__boton")
  botonEliminar.textContent = "Eliminar"
  botonEliminar.href = `id=${venta.idVenta}`
  contenedorBotones.appendChild(botonEliminar)
  
  botonEliminar.addEventListener("click",(e)=>{
      
      e.preventDefault()
  
      let idEliminar = botonEliminar.href 
      let id =  idEliminar.replace("http://localhost:5173/id=" , "")
  
       Delete(id)
       location.reload()
    })

  // Agregamos todos los elementos al card
  card.appendChild(titulo);
  card.appendChild(cliente);
  card.appendChild(valor);
  card.appendChild(abonado);
  card.appendChild(cantidadContainer);
  card.appendChild(hora);
   card.appendChild(contenedorBotones)
  contenedorVentas.appendChild(card)

})

   
}