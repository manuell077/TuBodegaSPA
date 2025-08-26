import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction'; 
import { ValidarPedidos } from '../../Helpers/Validacion';
import {post} from '../../Helpers/Request/Pedidios'
import { getPedidosNoTerminados } from '../../Helpers/Request/Pedidios';
import { getPedidosTerminados } from '../../Helpers/Request/Pedidios';
import { ObtenerVentasSinPedido} from '../../Helpers/Request/Pedidios';

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
        const data = await getPedidosNoTerminados()
        const dataTerminada = await getPedidosTerminados()
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
    dateClick: function (info) {
      
      if(rol != 1){
       const modal = document.querySelector('.modalOverlay');
       const selectorVentas = document.querySelector('#ventaAsociada')
       const id =  localStorage.getItem('cedula')
       ObtenerVentasSinPedido(selectorVentas,id)
       modal.style.display = 'flex'; // Muestra el fondo y el formulario centrado
       const formulario = document.querySelector('.formularioPedido')
       const fecha = document.querySelector('#fechaEntrega')
       fecha.value = info.dateStr;
       formulario.addEventListener("submit",(e)=>{
         e.preventDefault()

         let objeto = ValidarPedidos(e)

         if(objeto != false){
               objeto["fecha"] = fecha.value 
              post(e,objeto)
         
             }else{
         
               alert("Los campos no pueden quedar vacios")
          }

       })

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