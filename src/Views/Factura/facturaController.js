import { obtenerDatosDeEmpleado, traerPedidos , traerMediosDePago } from "../../Helpers/Request/factura"
import { traerValorVenta } from "../../Helpers/Request/factura"
import {ValidarFactura} from "../../Helpers/Validacion/Validaciones"
import { post } from "../../Helpers/Request/factura"
import { get,postAutenticado} from "../../Helpers/Request/api.js"
import { obtenerFacturaCompleta } from "../../Helpers/Request/factura"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ValidarEspaciosUsuarios , ValidarNumeros,ValidarCorreoFactura,ValidarNitoCedula , ValidarTelefonoFactura} from "../../Helpers/Validacion/Validaciones"
import Swal from 'sweetalert2';

export const facturaController = async() =>{
       

    
     const pedidos = await get(`pedidos/sin-factura`)
     const mediosDePago = await get(`factura/MedioDePago`)
     
    
     
    const pedidoSelect = document.querySelector("#pedido")
    const fecha = document.querySelector("#fecha")
    const iva = document.querySelector("#iva")
    const valorTotal = document.querySelector("#valorTotal")
    const pdf = document.querySelector(".generarPdf")
    const cedula = document.querySelector("#cedula")
    const telefono = document.querySelector("#telefono")
    const correo = document.querySelector("#correo")
    const direccion = document.querySelector("#direccion")
    const medioDePagoSelect = document.querySelector("#medioDePago")
    
    cedula.addEventListener("keydown" , ValidarNumeros)
    cedula.addEventListener("keyup",ValidarEspaciosUsuarios)
    cedula.addEventListener("blur",()=>{ValidarNitoCedula(cedula)})
    
    direccion.addEventListener("keyup",ValidarEspaciosUsuarios)

    telefono.addEventListener("keyup",ValidarEspaciosUsuarios)
    telefono.addEventListener("blur",()=>{ValidarTelefonoFactura(telefono)})

    telefono.addEventListener("keydown",ValidarNumeros)

    correo.addEventListener("keyup",ValidarEspaciosUsuarios)
    correo.addEventListener("blur",()=>{ValidarCorreoFactura(correo)})
    
    


    pedidos.forEach(element => {
        const opcion = document.createElement("option")
        opcion.value = element.idPedido
        opcion.textContent = element.idPedido
        pedidoSelect.appendChild(opcion)
    });
    
    mediosDePago.forEach(element =>{
         const opcion = document.createElement("option")
        opcion.value = element.idMedioDePago
        opcion.textContent = element.nombre
        medioDePagoSelect.appendChild(opcion)

    })
  

    
    
    

    
      
   pedidoSelect.addEventListener("change",async(e)=>{
    if(pedidoSelect.value ){  
        console.log("Select tiene un valor")
      const datosEmpleado = await get(`factura/empleado/${pedidoSelect.value}`)
      console.log(datosEmpleado)
      cedula.value = datosEmpleado.cedula
      telefono.value = datosEmpleado.telefono
      correo.value = datosEmpleado.correo_electronico
      direccion.value = datosEmpleado.direccion

      const valorVentaCambio =  await get(`pedidos/pedidoVenta/${pedidoSelect.value}`)


        sacarValorTotal(iva.value,valorVentaCambio[0].valor,valorTotal)
     
    }

   })
  

    let hoy = new Date();
    let año = hoy.getFullYear();
    let mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
    let dia = String(hoy.getDate()).padStart(2, '0');
     
    let fechaLocal = `${año}-${mes}-${dia}`;
    fecha.value = fechaLocal

    iva.value = 19
     


    pdf.addEventListener('submit',async(e)=>{
        
        e.preventDefault()

        let objeto = ValidarFactura(e)
         
        let data = {}
        data["fecha"] = objeto.fecha 
        data["medioDePago"] = objeto.medioDePago
        data["iva"] = objeto.iva
        data["valorTotal"] = 0
        data["fkPedido"] = objeto.fkPedido
         
        
        
          

        if(objeto != false){
           try{     
           await postAutenticado(`factura`,data)

           
           let facturaSeleccion = await get(`factura/${objeto.fkPedido}`)

           let factura = facturaSeleccion[0]
           console.log(factura)

          const doc = new jsPDF();

    // --- Encabezado Empresa ---
    doc.setFontSize(18);
    doc.text(factura.nombre_empresa, 105, 15, { align: "center" });
    doc.setFontSize(11);
    doc.text(`NIT: ${factura.nit}`, 10, 25);
    doc.text(`Dirección: ${factura.direccion_empresa}`, 10, 30);
    doc.text(`Teléfono: ${factura.linea_de_atencion}`, 10, 35);
    doc.text(`Correo: ${factura.correo_empresa}`, 10, 40);

    // --- Datos Factura ---
    doc.setFontSize(14);
    doc.text(`Factura #${factura.id_factura}`, 10, 50);
    doc.setFontSize(11);
    doc.text(`Fecha: ${factura.fecha_factura}`, 10, 55);
    doc.text(`Medio de pago: ${factura.nombre_medio_pago}`, 10, 60);
    doc.text(`Cliente: ${factura.nombre_cliente}`, 10, 65);

    // --- Tabla Productos ---
    
     autoTable(doc, {
    startY: 120,
    head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
    body: [
      [
        factura.nombre_producto,
        factura.cantidad_producto,
        `$${factura.precio}`,
        `$${factura.precio * factura.cantidad_producto}`
      ]
    ]
  });

    // --- Totales ---
    let yFinal = doc.lastAutoTable.finalY + 10;
    doc.text(`IVA: $${factura.iva}`, 10, yFinal);
    yFinal += 5;
    doc.text(`Total: $${valorTotal.value}`, 10, yFinal);

    // Descargar
    doc.save(`factura_${factura.id_factura}.pdf`);

      await Swal.fire({
                                           icon: 'success',
                                           title: '¡Éxito!',
                                           text: 'Factura generada',
                                           confirmButtonText: 'Aceptar'
                                           });
    
           }catch(e){
            console.log(e)
              Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al conectar con el servidor',
                          confirmButtonText: 'Aceptar'
                      });
           }
           

        }else{
           await  Swal.fire({
                                       icon: 'error',
                                       title: 'Error',
                                       text: 'Tienes que completar todos los campos',
                                       confirmButtonText: 'Aceptar'
                                        });
        }

    })

  
    


}


const sacarValorTotal = (iva,valor,elemento) =>{

     let valorIva =  (iva * valor)/100 ;
     let valorTotal = valorIva + valor
     elemento.value = valorTotal

}