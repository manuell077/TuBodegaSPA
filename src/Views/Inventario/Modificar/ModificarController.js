import { get,put } from "../../../Helpers/Request/api.js"
import { ValidarLetras , ValidarNumeros , ValidarEspacios, ValidarEspaciosInventario, ValidarInventario} from "../../../Helpers/Validacion/index.js"
import Swal from 'sweetalert2';


export const ModificarController = async (queryParams = null) =>{
  
  const {id} = queryParams
  const agregar = false;
  const formulario = document.querySelector("#ModificarProducto")
  
  const contenedor = document.querySelector(".agregarCards") 
  const productos = await get(`productos/${id}`) 
  
 const carta = document.createElement("div");
 carta.className = "carta carta--añadir";

// === Componente Imagen ===
const divImagen = document.createElement("div");
divImagen.className = "componente componente--imagenes";

const img = document.createElement("img");
img.src = `${productos[0].imagen}`; // ← viene del GET
img.className = "componente__label componente__label--imagenes";
divImagen.appendChild(img);

const inputImagen = document.createElement("input");
inputImagen.type = "file";
inputImagen.name = "imagen";
inputImagen.id = "imagen";
inputImagen.accept = "image/*";
inputImagen.required = true;
inputImagen.className = "componente__entrada componente__entrada--imagenes";
divImagen.appendChild(inputImagen);

carta.appendChild(divImagen);

// === Componente Nombre ===
const divNombre = document.createElement("div");
divNombre.className = "componente componente--cartas";

const labelNombre = document.createElement("label");
labelNombre.className = "componente__label componente__label--cartas";
labelNombre.textContent = "NOMBRE:";
divNombre.appendChild(labelNombre);

const inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.id = "nombre";
inputNombre.name = "nombre";
inputNombre.required = true;
inputNombre.value = productos[0].nombre; // ← viene del GET
inputNombre.className = "componente__entrada componente__entrada--cartas";
divNombre.appendChild(inputNombre);

carta.appendChild(divNombre);

// === Componente Peso ===
const divPeso = document.createElement("div");
divPeso.className = "componente componente--cartas";

const labelPeso = document.createElement("label");
labelPeso.className = "componente__label componente__label--cartas";
labelPeso.textContent = "Peso:";
divPeso.appendChild(labelPeso);

const inputPeso = document.createElement("input");
inputPeso.type = "text";
inputPeso.id = "peso";
inputPeso.name = "peso";
inputPeso.required = true;
inputPeso.value = productos[0].peso; // ← viene del GET
inputPeso.className = "componente__entrada componente__entrada--cartas";
divPeso.appendChild(inputPeso);

carta.appendChild(divPeso);

// === Componente Cantidad ===
const divCantidad = document.createElement("div");
divCantidad.className = "componente componente--cartas";

const labelCantidad = document.createElement("label");
labelCantidad.className = "componente__label componente__label--cartas";
labelCantidad.textContent = "Cantidad:";
divCantidad.appendChild(labelCantidad);

const inputCantidad = document.createElement("input");
inputCantidad.type = "text";
inputCantidad.id = "cantidad";
inputCantidad.name = "cantidad";
inputCantidad.required = true;
inputCantidad.value = productos[0].cantidadEnStock; // ← viene del GET
inputCantidad.className = "componente__entrada componente__entrada--cartas";
divCantidad.appendChild(inputCantidad);

carta.appendChild(divCantidad);

// === Componente Precio ===
const divPrecio = document.createElement("div");
divPrecio.className = "componente componente--cartas";

const labelPrecio = document.createElement("label");
labelPrecio.className = "componente__label componente__label--cartas";
labelPrecio.textContent = "Precio:";
divPrecio.appendChild(labelPrecio);

const inputPrecio = document.createElement("input");
inputPrecio.type = "text";
inputPrecio.id = "precio";
inputPrecio.name = "precio";
inputPrecio.required = true;
inputPrecio.value = productos[0].precio; // ← viene del GET
inputPrecio.className = "componente__entrada componente__entrada--cartas";
divPrecio.appendChild(inputPrecio);

carta.appendChild(divPrecio);


//Validacion de nombres y numeros
inputNombre.addEventListener("keydown",ValidarLetras)
inputPeso.addEventListener("keydown",ValidarNumeros)
inputCantidad.addEventListener("keydown",ValidarNumeros)
inputPrecio.addEventListener("keydown",ValidarNumeros)

//Validacion de espacios en blanco 
inputNombre.addEventListener("keyup",ValidarEspaciosInventario)
inputPeso.addEventListener("keyup",ValidarEspaciosInventario)
inputCantidad.addEventListener("keyup",ValidarEspaciosInventario)
inputPrecio.addEventListener("keyup",ValidarEspaciosInventario)

cambiarImagen(inputImagen, img);
contenedor.appendChild(carta);

formulario.addEventListener("submit",async (e)=>{
      
    

    let objeto =  ValidarInventario(e,agregar,img)

    if(objeto != false){
       
     
      
              
              const respuesta = await put(`productos/${id}`,objeto)
              // Si la eliminación es exitosa, muestra un mensaje de éxito
              await Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: respuesta.message,
                  confirmButtonText: 'Aceptar'
              });
              
    
          
     
     

    }else{

      Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: "Los campos no pueden quedar vacios ",
                  confirmButtonText: 'Aceptar'
              });
    }

})
    
}

const cambiarImagen =  (inputImagen,imagen) =>{
   
    inputImagen.addEventListener("change", function (e) { //Cunado cambie el input para seleccionar el archivo 
   const archivo = e.target.files[0]; //Selecciona el primer archivo aunque solo deja seleccionar uno 
   if (archivo) { //Si el archivo tiene algun valor 
    const url = URL.createObjectURL(archivo); //Crea una URL temporal para mostrar la imagen local
    imagen.src = url; //Le envia la url a la imagen
   }

 } )
}



 