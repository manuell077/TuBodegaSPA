import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction'; 
import { ValidarPedidos } from '../../Helpers/Validacion';
import {post} from '../../Helpers/Request/Pedidios'
import { getPedidosNoTemrinados } from '../../Helpers/Request/Pedidios';

export const pedidosController = () =>{
     
    
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
        const data = await getPedidosNoTemrinados()
        console.log(data)
        const eventos = data.map(item => ({
          title: `${item.cantidad} pedidos no terminados`,
          date: item.fecha,
          url: `#pedidos/Listar/fecha=${item.fecha}`
        }));

        successCallback(eventos);
      } catch (error) {
        console.error('Error al cargar pedidos no terminados:', error);
        failureCallback(error);
      }
    },
    dateClick: function (info) {
       const modal = document.querySelector('.modalOverlay');
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
  });

  calendar.render();
    
   document.querySelector('#modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') {
    e.target.style.display = 'none';
  }
});
}