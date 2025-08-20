import { obtenerDatosDeEmpleado, traerPedidos } from "../../Helpers/Request/factura"
import { traerValorVenta } from "../../Helpers/Request/factura"
import {ValidarFactura} from "../../Helpers/Validacion/Validaciones"
import { post } from "../../Helpers/Request/factura"
import { obtenerFacturaCompleta } from "../../Helpers/Request/factura"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ValidarEspaciosUsuarios , ValidarNumeros,ValidarCorreoFactura,ValidarNitoCedula , ValidarTelefonoFactura} from "../../Helpers/Validacion/Validaciones"

export const facturaController = async() =>{
       
     const pedidos = await traerPedidos()
     
    const pedidoSelect = document.querySelector("#pedido")
    const fecha = document.querySelector("#fecha")
    const iva = document.querySelector("#iva")
    const valorTotal = document.querySelector("#valorTotal")
    const pdf = document.querySelector(".generarPdf")
    const cedula = document.querySelector("#cedula")
    const telefono = document.querySelector("#telefono")
    const correo = document.querySelector("#correo")
    const direccion = document.querySelector("#direccion")
    
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
    const datosEmpleado = await obtenerDatosDeEmpleado(pedidoSelect.value)
    console.log(datosEmpleado)
    cedula.value = datosEmpleado.cedula
    telefono.value = datosEmpleado.telefono
    correo.value = datosEmpleado.correo_electronico
    direccion.value = datosEmpleado.direccion
    
   pedidoSelect.addEventListener("change",async(e)=>{
      const datosEmpleado = await obtenerDatosDeEmpleado(pedidoSelect.value)
      cedula.value = datosEmpleado.cedula
      telefono.value = datosEmpleado.telefono
      correo.value = datosEmpleado.correo_electronico
      direccion.value = datosEmpleado.direccion


   })

    let hoy = new Date();
    let año = hoy.getFullYear();
    let mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
    let dia = String(hoy.getDate()).padStart(2, '0');
     
    let fechaLocal = `${año}-${mes}-${dia}`;
    fecha.value = fechaLocal

    iva.value = 19
     
    const valorVenta = await traerValorVenta(pedidoSelect.value)
    
   const valorTotalFactura = sacarValorTotal(iva.value,valorVenta[0].valor,valorTotal)
    

    pedidoSelect.addEventListener('change',async(event)=>{
        const valorVentaCambio =  await traerValorVenta(pedidoSelect.value)


        sacarValorTotal(iva.value,valorVentaCambio[0].valor,valorTotal)
    })

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
                
           await post(e,data)
           let facturaSeleccion = await obtenerFacturaCompleta(objeto.fkPedido)
           let factura = facturaSeleccion[0]
           console.log(factura)

          const doc = new jsPDF();

    // --- Encabezado Empresa ---
    doc.setFontSize(18);
    doc.text(factura.nombreEmpresa, 105, 15, { align: "center" });
    doc.setFontSize(11);
    doc.text(`NIT: ${factura.nit}`, 10, 25);
    doc.text(`Dirección: ${factura.direccionEmpresa}`, 10, 30);
    doc.text(`Teléfono: ${factura.lineaDeAtencion}`, 10, 35);
    doc.text(`Correo: ${factura.correoEmpresa}`, 10, 40);

    // --- Datos Factura ---
    doc.setFontSize(14);
    doc.text(`Factura #${factura.idFactura}`, 10, 50);
    doc.setFontSize(11);
    doc.text(`Fecha: ${factura.fechaFactura}`, 10, 55);
    doc.text(`Medio de pago: ${factura.medioPago}`, 10, 60);
    doc.text(`Cliente: ${factura.nombreCliente}`, 10, 65);

    // --- Tabla Productos ---
    
     autoTable(doc, {
    startY: 120,
    head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
    body: [
      [
        factura.nombreProducto,
        factura.cantidadProducto,
        `$${factura.precio}`,
        `$${factura.precio * factura.cantidadProducto}`
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

      
    location.reload()

        }else{
           alert("Tienes que completar todos los campos")
        }

    })


    
    


}


const sacarValorTotal = (iva,valor,elemento) =>{

     let valorIva =  (iva * valor)/100 ;
     let valorTotal = valorIva + valor
     elemento.value = valorTotal

}