import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction'; 
import { ValidarPedidos } from '../../Helpers/Validacion';
import {postAutenticado,get, tienePermiso} from '../../Helpers/Request/api.js';
import { ObtenerVentasSinPedido} from '../../Helpers/Request/Pedidios';
import Swal from 'sweetalert2';


export const pedidosController = () =>{
     
     const rol = localStorage.getItem("rol")
      const calendarEl = document.querySelector('.calendar');
      

      
      
      const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, listPlugin , interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },
    events: async function(fetchInfo, successCallback, failureCallback) {
      try {
        const data = await get(`pedidos/no-terminados-por-fecha`)
        const dataTerminada = await get(`pedidos/terminados-fecha`)
        console.log(data)
        console.log(dataTerminada)
        const eventos = data.map(item => ({
          title: `${item.cantidad} pedidos no terminados`,
          date: item.fecha,
          url: `#pedidos/Listar/fecha=${item.fecha}`,
          backgroundColor: 'red'
        }));
         
        const eventosDos = dataTerminada.map(item => ({
          title: `${item.cantidad} pedidos  terminados`,
          date: item.fecha,
          url: `#pedidos/Listar/fecha=${item.fecha}`,
          backgroundColor: 'green'
        }));
        
       const todosLosEventos = [...eventos,...eventosDos];

        successCallback(todosLosEventos);
      } catch (error) {
        console.error('Error al cargar pedidos no terminados:', error);
        failureCallback(error);
      }
    },
    dateClick: async function (info) {
      
      
       const modal = document.querySelector('.modalOverlay');
       const selectorVentas = document.querySelector('#ventaAsociada')
       const id =  localStorage.getItem('cedula')
       const ventas = await get(`ventas/sin-pedido/${id}`)

        ventas.forEach(element => {
          
            let opcion = document.createElement("option");
            opcion.value = element.idVenta;
            opcion.textContent = "Venta " + element.idVenta;
            selectorVentas.append(opcion);
        
        });

       modal.style.display = 'flex'; // Muestra el fondo y el formulario centrado
       const formulario = document.querySelector('.formularioPedido')
       const fecha = document.querySelector('#fechaEntrega')
       fecha.value = info.dateStr;
       formulario.addEventListener("submit", async(e)=>{
         e.preventDefault()

         let objeto = ValidarPedidos(e)

         if(objeto != false){
               objeto["fecha"] = fecha.value 
               try{
             const respuesta = await  postAutenticado("pedidos",objeto)
              
             await Swal.fire({
                                       icon: 'success',
                                       title: '¡Éxito!',
                                       text: respuesta.message,
                                       confirmButtonText: 'Aceptar'
                                   });
             location.reload()
                                  }catch(e){
                                    console.error(e)
                                  }
             }else{
         
              Swal.fire({
                                      icon: 'error',
                                      title: 'Error',
                                      text: "Los campos no pueden quedar vacios",
                                      confirmButtonText: 'Aceptar'
                                  });
          }

       })

    if(!tienePermiso('pedidos.crear')){
       modal.style.display = "none"
    }
  }
  });

  calendar.render();
    
   document.querySelector('#modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') {
    e.target.style.display = 'none';
  }
});
}