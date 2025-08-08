import { ObtenerProductos} from "../../../Helpers/Request/Ventas.js";
import { ObtenerUsuarios } from "../../../Helpers/Request/Ventas.js";
import {ValidarNumeros, ValidarVentas} from "../../../Helpers/Validacion/Validaciones.js"
import { Post } from "../../../Helpers/Request/Ventas.js";
import { ValidarLetras , ValidarEspaciosVentas} from "../../../Helpers/Validacion/index.js";

export const agregarVentaController  =  () =>{

const contenedorCartas = document.querySelector(".agregarCards")
const formularioVentas = document.querySelector(".formularioVentas")
const productos = []

// Crear la carta principal
const carta = document.createElement('div');
carta.className = 'carta carta--venta';

// VENTA N°
const titulo = document.createElement('p');
titulo.className = 'carta__venta';
titulo.textContent = 'VENTA N°';
carta.appendChild(titulo);

// Cliente
const cliente = document.createElement('p');
cliente.className = 'carta__parrafo';
cliente.textContent = 'Cliente: ';
const inputCliente = document.createElement('input');
inputCliente.type = 'text';
inputCliente.required = true;
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
inputAbonado.value = 0
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

// Botón para agregar productos
const btnAgregar = document.createElement('button');
btnAgregar.type = 'button';
btnAgregar.textContent = 'Agregar producto';



btnAgregar.addEventListener("click", () => {

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
  ObtenerProductos(nuevoProducto)
  
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
const opcionUsuario = document.createElement('option');
opcionUsuario.textContent = "Selecciona un usuario"
opcionUsuario.disabled = true;     
opcionUsuario.hidden = true;
opcionUsuario.value = "";       
opcionUsuario.selected = true;  
ObtenerUsuarios(selectorUsuario,0)



// Saldo total como párrafo
const saldoTotal = document.createElement('p');
saldoTotal.className = 'carta__parrafo';
saldoTotal.id = 'saldoTotal'
saldoTotal.textContent = 'Saldo Total: $0.00'; // puedes reemplazarlo por un valor dinámico
carta.appendChild(saldoTotal);

selectorUsuario.append(opcionUsuario)
usuario.appendChild(selectorUsuario)

carta.appendChild(usuario)

// Agrega la carta al contenedor
contenedorCartas.appendChild(carta);





formularioVentas.addEventListener("submit",(e)=>{
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
          console.log("El valor " + i);
          
        })
          objeto["productos"] = productos
          objeto["valor"] = 0
          objeto["saldoTotal"] = 0
          console.log(objeto)
          Post(e,objeto)

          //Resetear valores
          formularioVentas.reset();
          productosContainer.innerHTML = "";
          document.querySelector('#saldoTotal').textContent = "Saldo Total: $0.00";
          selectorUsuario.selectedIndex = 0;
       }


    }else{
      alert("Tienes que completar todos los campos")
    }

})


   cliente.addEventListener("keydown",ValidarLetras)
   abonado.addEventListener("keyup",ValidarNumeros) 



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