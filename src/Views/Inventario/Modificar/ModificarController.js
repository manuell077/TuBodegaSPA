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

// Imagen
const img = document.createElement("img");
img.src = `${productos[0].imagen}`;
img.className = "carta__imagen carta__imagen--añadir";
carta.appendChild(img);

// Input de imagen
const inputImagen = document.createElement("input");
inputImagen.type = "file";
inputImagen.name = "imagen";
inputImagen.id = "imagen";
inputImagen.className = "carta__addImagen";
carta.appendChild(inputImagen);

// Nombre
const pNombre = document.createElement("p");
pNombre.className = "carta__parrafo";
pNombre.textContent = "NOMBRE:";
const inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.id = "nombre";
inputNombre.name = "nombre";
inputNombre.required = true;
inputNombre.value = productos[0].nombre
pNombre.appendChild(inputNombre);
carta.appendChild(pNombre);

// Peso
const pPeso = document.createElement("p");
pPeso.className = "carta__parrafo";
pPeso.textContent = "Peso: ";
const inputPeso = document.createElement("input");
inputPeso.type = "text";
inputPeso.id = "peso";
inputPeso.name = "peso";
inputPeso.value = productos[0].peso
inputPeso.required = true;
pPeso.appendChild(inputPeso);
carta.appendChild(pPeso);

// Cantidad
const divCantidad = document.createElement("div");
divCantidad.className = "cantidad";

const pCantidad = document.createElement("p");
pCantidad.className = "cantidad__parrafo";
pCantidad.textContent = "Cantidad: ";
divCantidad.appendChild(pCantidad);

const inputCantidad = document.createElement("input");
inputCantidad.type = "text";
inputCantidad.name = "cantidadEnStock";
inputCantidad.id = "cantidad";
inputCantidad.value = productos[0].cantidadEnStock
inputCantidad.required = true;
divCantidad.appendChild(inputCantidad);

carta.appendChild(divCantidad);

// Precio
const pPrecio = document.createElement("p");
pPrecio.className = "carta__parrafo";
pPrecio.textContent = "Precio: ";
const inputPrecio = document.createElement("input");
inputPrecio.type = "text";
inputPrecio.name = "precio";
inputPrecio.id = "precio";
inputPrecio.value = productos[0].precio
inputPrecio.required = true;
pPrecio.appendChild(inputPrecio);
carta.appendChild(pPrecio);

// Agregar al DOM 
contenedor.appendChild(carta);
cambiarImagen(inputImagen,img)


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



 