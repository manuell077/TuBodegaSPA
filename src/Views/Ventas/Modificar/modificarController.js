import { ObtenerProductos } from "../../../Helpers/Request/Ventas"


import {put,get} from "../../../Helpers/Request/api.js"
import {ValidarEspaciosVentas, ValidarLetras, ValidarNumeros, ValidarVentas} from "../../../Helpers/Validacion/Validaciones"
import Swal from 'sweetalert2';

export const modificarController = async(queryParams = null) =>{
    
    const {id} = queryParams
     
    
    


    const contenido = await get(`ventas/${id}`)
    
    
    

    const contenedorCartas = document.querySelector(".agregarCards")
    const formularioVentas = document.querySelector(".formularioVentas")
    const productos = []
    
    // Crear la carta principal
    const carta = document.createElement('div');
    carta.className = 'carta carta--venta';
    
    // VENTA N°
    const titulo = document.createElement('p');
    titulo.className = 'carta__venta';
    titulo.textContent = `VENTA N° ${contenido[0].idVenta}`;
    carta.appendChild(titulo);
    
    // Cliente
    const cliente = document.createElement('p');
    cliente.className = 'carta__parrafo';
    cliente.textContent = 'Cliente: ';
    const inputCliente = document.createElement('input');
    inputCliente.type = 'text';
    inputCliente.required = true;
    inputCliente.value = contenido[0].nombreCliente
    inputCliente.name = "nombreCliente";
    cliente.appendChild(inputCliente);
    carta.appendChild(cliente);
    
    // Valor
    const valor = document.createElement('p');
    valor.className = 'carta__parrafo';
    valor.textContent = 'Valor: ';
    
    const inputValor = document.createElement('input');
    inputValor.type = 'text';
    inputValor.name = "valor";
    inputValor.id = "valor"
    inputValor.readOnly = true;
    valor.appendChild(inputValor);
    carta.appendChild(valor);
    
    // Abonado
    const abonado = document.createElement('p');
    abonado.className = 'carta__parrafo';
    abonado.textContent = 'Abonado: ';
    const inputAbonado = document.createElement('input');
    inputAbonado.type = 'text';
    inputAbonado.required = true;
    inputAbonado.name = "cantidadAbonado";
    inputAbonado.id = "abonado"
    inputAbonado.value = contenido[0].cantidadAbonado
    abonado.appendChild(inputAbonado);
    carta.appendChild(abonado);
    
    abonado.addEventListener("input",SacarSaldo)
    
    // Contenedor productos
    const contenedorProductos = document.createElement('div');
    contenedorProductos.className = 'cantidad cantidad--productos';
    
    const tituloProductos = document.createElement('p');
    tituloProductos.className = 'cantidad__parrafo';
    tituloProductos.textContent = 'Cantidad:';
    contenedorProductos.appendChild(tituloProductos);
    
    // Contenedor de inputs de productos
    const productosContainer = document.createElement('div');
    productosContainer.id = 'productosContainer';
    contenedorProductos.appendChild(productosContainer);
     

    const productosVenta = contenido[0].productos
  
   console.log(productosVenta);
   

  for(const producto of productosVenta){
  const productoCantidad = document.createElement('div');
  productoCantidad.classList.add('cantidadProductos');

  const nuevoProducto = document.createElement('select');
  nuevoProducto.classList.add('cantidadProductos__selector');

  const opcion = document.createElement('option');
  opcion.textContent = "Selecciona un producto";
  opcion.disabled = true;
  opcion.hidden = true;
  opcion.value = "";
  nuevoProducto.append(opcion);
  
  
  // Rellenar el select con todos los productos
  const productos = await get(`productos/estado1`)
    
    productos.forEach(element => {
              let opcion = document.createElement("option");
              opcion.value = element.idProducto;
              opcion.textContent = element.nombre;
              opcion.setAttribute("data-precio", element.precio);
              nuevoProducto.append(opcion);
          });

  const cantidadDeProducto = document.createElement('input');
  cantidadDeProducto.type = 'number';
  cantidadDeProducto.min = '1';
  cantidadDeProducto.value = producto.cantidad;
  cantidadDeProducto.classList.add('cantidadProductos__numero');

  const btnEliminar = document.createElement('button');
  btnEliminar.type = 'button';
  btnEliminar.classList.add('cantidadProductos__btnEliminarProducto');

  const icono = document.createElement('img');
  icono.src = '/Images/basura.png';
  icono.alt = 'Eliminar';
  icono.classList.add('imagenEliminar');

  btnEliminar.appendChild(icono);
  btnEliminar.addEventListener("click", () => {
    productoCantidad.remove();
    SacarTotal();
  });
  
  

  nuevoProducto.addEventListener("change", SacarTotal);
  cantidadDeProducto.addEventListener("input", SacarTotal);

  productoCantidad.appendChild(nuevoProducto);
  productoCantidad.appendChild(cantidadDeProducto);
  productoCantidad.appendChild(btnEliminar);

  productosContainer.appendChild(productoCantidad);
  
}





    // Botón para agregar productos
    const btnAgregar = document.createElement('button');
    btnAgregar.type = 'button';
    btnAgregar.textContent = 'Agregar producto';
    
    
    
    btnAgregar.addEventListener("click", async() => {
    
      const productoCantidad = document.createElement('div')
      productoCantidad.classList.add('cantidadProductos')
    
      const nuevoProducto = document.createElement('select');
      nuevoProducto.className = 'cantidadProductos__selector';
      const opcion = document.createElement('option');
      opcion.textContent = "Selecciona un producto"
      opcion.disabled = true;     
      opcion.hidden = true;
      opcion.value = "";       
      opcion.selected = true;  
      const respuesta = await get(`productos/estado1`)
  
  respuesta.forEach(element => {
            let opcion = document.createElement("option");
            opcion.value = element.idProducto;
            opcion.textContent = element.nombre;
            opcion.setAttribute("data-precio", element.precio);
            nuevoProducto.append(opcion);
        });
      
      const cantidadDeProducto = document.createElement('input')
      cantidadDeProducto.type = 'number'
      cantidadDeProducto.min = '1'
      cantidadDeProducto.value = '1'
      cantidadDeProducto.classList.add('cantidadProductos__numero')   
    
    
      const btnEliminar = document.createElement('button');
      btnEliminar.type = 'button';
      btnEliminar.classList.add('cantidadProductos__btnEliminarProducto');
    
      const icono = document.createElement('img');
      icono.src = '/Images/basura.png'; 
      icono.alt = 'Eliminar';
      icono.classList.add('imagenEliminar')
    
      
      btnEliminar.addEventListener("click", () => {
        productoCantidad.remove();
        SacarTotal(); 
      });
       
      btnEliminar.appendChild(icono)
    
      nuevoProducto.append(opcion)
      productoCantidad.appendChild(nuevoProducto)
      productoCantidad.appendChild(cantidadDeProducto)
      productoCantidad.appendChild(btnEliminar)
      productosContainer.appendChild(productoCantidad);
      
      
      nuevoProducto.addEventListener("change",SacarTotal)
      cantidadDeProducto.addEventListener("input",SacarTotal)
      
    });
    
    contenedorProductos.appendChild(btnAgregar);
    carta.appendChild(contenedorProductos);
    
    // Fecha y hora
    const fechaHora = document.createElement('p');
    fechaHora.className = 'carta__parrafo';
    fechaHora.textContent = 'Fecha: ';
    const inputFecha = document.createElement('input');
    inputFecha.type = 'date';
    inputFecha.required = true;
    inputFecha.name = "fechaHora";
    inputFecha.value = contenido[0].fechaHora;
    fechaHora.appendChild(inputFecha);
    carta.appendChild(fechaHora);
    
    const  usuario = document.createElement('p');
    usuario.className = 'carta__parrafo';
    usuario.textContent = 'Usuario: ';
    const selectorUsuario = document.createElement('select')
    selectorUsuario.className = 'cantidadProductos__selector';
    selectorUsuario.required = true; 
    selectorUsuario.name = "fkUsuarios"; 
    selectorUsuario.id = "usuarioSelector";
    
    let nombreUsuario = localStorage.getItem('nombre');
        let cedula = localStorage.getItem('cedula');

        let opcion = document.createElement("option");
        opcion.value = cedula;
        opcion.textContent = "Nombre: " + nombreUsuario + " Cedula: " + cedula;
        opcion.selected = true;
        selectorUsuario.append(opcion);
    
    
    
    // Saldo total como párrafo
    const saldoTotal = document.createElement('p');
    saldoTotal.className = 'carta__parrafo';
    saldoTotal.id = 'saldoTotal'
    saldoTotal.textContent = 'Saldo Total: $0.00'; // puedes reemplazarlo por un valor dinámico
    carta.appendChild(saldoTotal);
    
    
    usuario.appendChild(selectorUsuario)
    
    carta.appendChild(usuario)
    
    // Agrega la carta al contenedor
    contenedorCartas.appendChild(carta);
    
     SacarTotal();

     formularioVentas.addEventListener("submit", async(e)=>{
          

          e.preventDefault()
          const objeto = ValidarVentas(e)
          const valorVenta = document.querySelector("#valor")
          const productosContainer = document.querySelector(".cantidadProductos")
          const selectorUsuario = document.querySelector("#usuarioSelector")
      
          if(objeto != false){
              
            const selectsProductos = document.querySelectorAll(".cantidadProductos__selector")
            const contadorNumeros = document.querySelectorAll(".cantidadProductos__numero") 
      
             
             
             if((selectsProductos.length - 1) == 0 ){
               alert("Tienes que agregar por lo menos un producto")
               return false   
      
             }else{
                
              const selectsArray = Array.from(selectsProductos)
              const contadorArray = Array.from(contadorNumeros)
                
              selectsArray.pop()
              
      
              selectsArray.forEach((select,i) =>{
                
                 
                 
                 
      
                if(!select.value){
                  alert("Tienes que agregar los productos")
                  return false
      
                }
                 
                productos.push({
                  idProducto: select.value,
                  cantidad: contadorArray[i].value
                })
                
                
              })
                objeto["productos"] = productos
                objeto["valor"] = 0
                objeto["saldoTotal"] = 0
                const respuesta = await put(`ventas/${id}`,objeto)
                Swal.fire({
                                          icon: 'success',
                                          title: '¡Éxito!',
                                          text: respuesta.message,
                                          confirmButtonText: 'Aceptar'
                                      });

                
             }
      
      
          }else{
            alert("Tienes que completar todos los campos")
          }
     })
   
     
    abonado.addEventListener("keydown",ValidarNumeros)
    cliente.addEventListener("keydown",ValidarLetras)

    cliente.addEventListener("keyup",ValidarEspaciosVentas)
    abonado.addEventListener("keyup",ValidarEspaciosVentas)
    fechaHora.addEventListener("keyup",ValidarEspaciosVentas)
    selectorUsuario.addEventListener("change",ValidarEspaciosVentas)
}

const SacarTotal = () =>{
   
   const productosSeleccionados = document.querySelectorAll('.cantidadProductos');
   
   
   const valor = document.querySelector('#valor') 
   
   

   let total = 0;

  productosSeleccionados.forEach(productoDiv => {
    const select = productoDiv.querySelector('.cantidadProductos__selector');
    console.log(productosSeleccionados);
    const cantidadInput = productoDiv.querySelector('.cantidadProductos__numero');
    
    
    const selectedOption = select.selectedOptions[0];
    
    console.log(selectedOption)

    const precio = parseFloat(selectedOption.dataset.precio); 
    const cantidad = parseInt(cantidadInput.value)


    total += precio * cantidad;
  });
   
   valor.value = total;
   SacarSaldo()
}


const SacarSaldo = () =>{
    
   const  valor = document.querySelector('#valor')
   const  abonado = document.querySelector('#abonado')
   const  saldoTotal = document.querySelector("#saldoTotal")

   let saldo = 0;
   
   saldo = valor.value - abonado.value
   saldoTotal.textContent = `Saldo Total: $${saldo}`
   
  
   


}