import { ObtenerProductos} from "../../../Helpers/Request/Ventas.js";
import { ObtenerUsuarios } from "../../../Helpers/Request/Ventas.js";
import {ValidarNumeros, ValidarVentas} from "../../../Helpers/Validacion/Validaciones.js"
import { postAutenticado,get} from "../../../Helpers/Request/api.js";
import { ValidarLetras , ValidarEspaciosVentas} from "../../../Helpers/Validacion/index.js";
import Swal from 'sweetalert2';

export const agregarVentaController  = async () =>{


const formularioVentas = document.querySelector(".formularioVentas")
const productos = []

// Crear la carta principal
const carta = document.createElement('div');
carta.className = 'carta carta--añadir';

// VENTA N°
const titulo = document.createElement('p');
titulo.className = 'carta__venta';
titulo.textContent = 'VENTA N°';
carta.appendChild(titulo);

    // Cliente
    const clienteDiv = document.createElement('div');
    clienteDiv.className = 'componente componente--cartas';

    const clienteLabel = document.createElement('label');
    clienteLabel.className = 'componente__label componente__label--cartas';
    clienteLabel.textContent = 'Cliente: ';

    const inputCliente = document.createElement('input');
    inputCliente.type = 'text';
    inputCliente.required = true;
    inputCliente.name = "nombreCliente";
    inputCliente.className = 'componente__entrada componente__entrada--cartas';

    clienteDiv.appendChild(clienteLabel);
    clienteDiv.appendChild(inputCliente);
    carta.appendChild(clienteDiv);
    
    // Valor
    const valorDiv = document.createElement('div');
    valorDiv.className = 'componente componente--cartas';

    const valorLabel = document.createElement('label');
    valorLabel.className = 'componente__label componente__label--cartas';
    valorLabel.textContent = 'Valor: ';

    const inputValor = document.createElement('input');
    inputValor.type = 'text';
    inputValor.name = "valor";
    inputValor.id = "valor";
    inputValor.readOnly = true;
    inputValor.className = 'componente__entrada componente__entrada--cartas';

    valorDiv.appendChild(valorLabel);
    valorDiv.appendChild(inputValor);
    carta.appendChild(valorDiv);
    
    // Abonado
    const abonadoDiv = document.createElement('div');
    abonadoDiv.className = 'componente componente--cartas';

    const abonadoLabel = document.createElement('label');
    abonadoLabel.className = 'componente__label componente__label--cartas';
    abonadoLabel.textContent = 'Abonado: ';

    const inputAbonado = document.createElement('input');
    inputAbonado.type = 'text';
    inputAbonado.required = true;
    inputAbonado.name = "cantidadAbonado";
    inputAbonado.id = "abonado";
    inputAbonado.className = 'componente__entrada componente__entrada--cartas';

    abonadoDiv.appendChild(abonadoLabel);
    abonadoDiv.appendChild(inputAbonado);
    carta.appendChild(abonadoDiv);

    inputAbonado.addEventListener("input", SacarSaldo);
    
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
    const fechaDiv = document.createElement('div');
    fechaDiv.className = 'componente componente--cartas';

    const fechaLabel = document.createElement('label');
    fechaLabel.className = 'componente__label componente__label--cartas';
    fechaLabel.textContent = 'Fecha: ';

    const inputFecha = document.createElement('input');
    inputFecha.type = 'date';
    inputFecha.required = true;
    inputFecha.name = "fechaHora";
    inputFecha.className = 'componente__entrada componente__entrada--cartas';

    fechaDiv.appendChild(fechaLabel);
    fechaDiv.appendChild(inputFecha);
    carta.appendChild(fechaDiv);
    
    const  usuario = document.createElement('p');
    usuario.className = 'carta__parrafo';
    usuario.textContent = 'Empleado: ';
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
    saldoTotal.className = 'carta__parrafo carta__parrafo--saldoTotal';
    saldoTotal.id = 'saldoTotal'
    saldoTotal.textContent = 'Saldo Total: $0.00'; // puedes reemplazarlo por un valor dinámico
    carta.appendChild(saldoTotal);
    
    
    usuario.appendChild(selectorUsuario)
    
    carta.appendChild(usuario)
    
    // Agrega la carta al contenedor
    formularioVentas.prepend(carta);




formularioVentas.addEventListener("submit",async(e)=>{
    e.preventDefault()  

    const objeto = ValidarVentas(e)
    const valorVenta = document.querySelector("#valor")
    const productosContainer = document.querySelector(".cantidadProductos")
    const selectorUsuario = document.querySelector("#usuarioSelector")

    if(objeto != false){
        
      const selectsProductos = document.querySelectorAll(".cantidadProductos__selector")
      const contadorNumeros = document.querySelectorAll(".cantidadProductos__numero") 

       
       
       if((selectsProductos.length - 1) == 0 ){
           Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Tienes que agregar por lo menos un producto",
                        confirmButtonText: 'Aceptar'
                    });
         return false   

       }else{
          
        const selectsArray = Array.from(selectsProductos)
        const contadorArray = Array.from(contadorNumeros)
          
        selectsArray.pop()
        

        selectsArray.forEach((select,i) =>{
          
           
           
           

          if(!select.value){
            Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Tienes que agregar por lo menos un producto",
                        confirmButtonText: 'Aceptar'
                    });
            return false

          }
           
          productos.push({
            idProducto: select.value,
            cantidad: contadorArray[i].value
          })
          console.log("El valor " + i);
          
        })
          objeto["productos"] = productos
          objeto["valor"] = 0
          objeto["saldoTotal"] = 0
          console.log(objeto)
          
          try{
          const respuesta = await postAutenticado(`ventas`,objeto)
           
          Swal.fire({
                          icon: 'success',
                          title: '¡Éxito!',
                          text: respuesta.message,
                          confirmButtonText: 'Aceptar'
                      });
          }catch(e){

            console.error(e)
                    }           
          //Resetear valores
          formularioVentas.reset();
          productosContainer.innerHTML = "";
          document.querySelector('#saldoTotal').textContent = "Saldo Total: $0.00";
          selectorUsuario.selectedIndex = 0;
       }


    }else{
      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Tienes que completar todos los campos",
                        confirmButtonText: 'Aceptar'
                    });
    }

})


   inputCliente.addEventListener("keydown",ValidarLetras)
   inputAbonado.addEventListener("keydown",ValidarNumeros) 



   inputCliente.addEventListener("keyup",ValidarEspaciosVentas)
   inputAbonado.addEventListener("keyup",ValidarEspaciosVentas)
   inputFecha.addEventListener("keyup",ValidarEspaciosVentas)
   selectorUsuario.addEventListener("change",ValidarEspaciosVentas)

}

const SacarTotal = () =>{
   
   const productosSeleccionados = document.querySelectorAll('.cantidadProductos');
   const valor = document.querySelector('#valor') 
   
   

   let total = 0;

  productosSeleccionados.forEach(productoDiv => {
    const select = productoDiv.querySelector('.cantidadProductos__selector');
    const cantidadInput = productoDiv.querySelector('.cantidadProductos__numero');
    
    
    const selectedOption = select.selectedOptions[0];

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