import {Get,Delete} from "../../Helpers/Request/GetProductos.js"


export const inventarioController =  async() =>{
    
  const contenedor = document.querySelector(".agregarCards") 
  const productos = await Get()

  console.log(productos);
  
  
  productos.forEach(element => {
    
  const carta = document.createElement("div")
  carta.classList.add("carta")
  const img = document.createElement("img")
  img.src = element.imagen;
  img.classList.add("carta__imagen")
  carta.appendChild(img)

  const pNombre = document.createElement("p");
  pNombre.classList.add("carta__parrafo");
  pNombre.textContent = "Nombre: " + element.nombre 
  carta.appendChild(pNombre)

  const pPeso = document.createElement("p");
  pPeso.classList.add("carta__parrafo")
  pPeso.textContent = "Peso: " + element.peso + " kg"
  carta.appendChild(pPeso)

  const divCantidad = document.createElement("div");
  divCantidad.classList.add("cantidad");

  const pCantidad = document.createElement("p");
  pCantidad.classList.add("cantidad__parrafo");
  pCantidad.textContent = "Cantidad: "
  divCantidad.appendChild(pCantidad)

  const circulo = document.createElement("div");
  circulo.classList.add("cantidad__circulo");
  circulo.textContent = element.cantidadEnStock;
  divCantidad.appendChild(circulo)
  carta.appendChild(divCantidad)

  const pPrecio = document.createElement("p");
  pPrecio.classList.add("carta__parrafo");
  pPrecio.textContent = "Precio: " + element.precio;
  carta.appendChild(pPrecio)

  const contenedorBotones = document.createElement("div")
  contenedorBotones.classList.add("botonesCarta")
  carta.appendChild(contenedorBotones)
   
  const botonModificar = document.createElement("a")
  botonModificar.classList.add("botonesCarta__boton")
  botonModificar.textContent = "Modificar"
  botonModificar.href = `#inventario/Modificar/id=${element.idProducto}`
  contenedorBotones.appendChild(botonModificar)
   
  const botonEliminar = document.createElement("a")
  botonEliminar.classList.add("botonesCarta__boton")
  botonEliminar.textContent = "Eliminar"
  botonEliminar.href = `id=${element.idProducto}`

  contenedorBotones.appendChild(botonEliminar)

  
  contenedor.appendChild(carta)

  botonEliminar.addEventListener("click",(e)=>{
    
    e.preventDefault()

    let idEliminar = botonEliminar.href 
    let id =  idEliminar.replace("http://localhost:5173/id=" , "")

     Delete(id)
     location.reload()
     
  })

 });
  



}