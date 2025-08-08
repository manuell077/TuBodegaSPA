import { getPedidosPorFecha } from "../../../Helpers/Request/Pedidios"

export const listarController = async(queryParams = null) =>{
     
    const {fecha} = queryParams
    
     const pedidos = await getPedidosPorFecha(fecha)

     console.log(pedidos);
     

}