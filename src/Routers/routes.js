import { bienvenidaController } from "../Views/Bienvenida/bienvenidaController.js"
import { loginController} from "../Views/Login/loginControlador.js"
import { registroController} from "../Views/Registro/registroControlador.js"
import { inventarioController} from "../Views/Inventario/inventarioController.js"
import {AgregarController} from "../Views/Inventario/Agregar/AgregarController.js"
import {ModificarController} from "../Views/Inventario/Modificar/ModificarController.js"
import {ventasController} from "../Views/Ventas/ventasController.js"
import { agregarVentaController } from "../Views/Ventas/Agregar/agregarVentaController.js"
import { modificarController } from "../Views/Ventas/Modificar/modificarController.js"
import {pedidosController} from "../Views/Pedidos/pedidosController.js"
import { listarController } from "../Views/Pedidos/Listar/listarController.js"
import { modificarPedidosController } from "../Views/Pedidos/Modificar/modificarController.js"
import { deudoresController} from "../Views/Deudores/deudoresController.js"
import { usuariosController } from "../Views/usuarios/usuariosController.js"
import { agregarUsuariosController } from "../Views/usuarios/Agregar/AgregarController.js"
import { modificarUsuariosControlador } from "../Views/usuarios/Modificar/ModificarControlador.js"
import {facturaController} from "../Views/Factura/facturaController.js"
import {empresaModificarController} from "../Views/EmpresaModificar/empresaController.js"

export const routers = {
     


    bienvenida:{
        path: "bienvenida/index.html",
        controller: bienvenidaController,
        private:false
        
    },
    
    login:{
         path: "login/index.html",
         controller: loginController,
         private: false
         
    },
    registrarme:{
          path: "registro/index.html",
         controller: registroController,
         private: false
        
    },
    inventario:{

        "/":{
        path: "Inventario/index.html",
        controller: inventarioController,
        private: true
        },
        Agregar:{
        path: "Inventario/Agregar/index.html",
        controller: AgregarController,
        private: true
        },
        Modificar:{
        path: "Inventario/Modificar/index.html",
        controller: ModificarController,
        private: true
        }
        
    },
    ventas:{
       "/":{
        path: "Ventas/index.html",
        controller: ventasController,
        private: true
        },
        Agregar:{
        path: "Ventas/Agregar/index.html",
        controller: agregarVentaController,
        private: true
        },
        Modificar:{
        path: "Ventas/Modificar/index.html",
        controller: modificarController,
        private: true
        } 
    },
    pedidos:{
        "/":{
           path: "Pedidos/index.html",
           controller: pedidosController,
           private: true  
        },
        Listar:{
            path: "Pedidos/Listar/index.html",
            controller: listarController,
            private: true 
        },
        Modificar:{
            path: "Pedidos/Modificar/index.html",
            controller: modificarPedidosController,
            private: true 
        }
    
    },
    deudores:{
        "/":{
            path: "Deudores/index.html",
            controller: deudoresController,
            private: true
        }
    } , 

    usuarios:{

        "/":{
            path: "usuarios/index.html",
            controller: usuariosController,
            private: true
        },
        Agregar:{
            path: "usuarios/Agregar/index.html",
            controller: agregarUsuariosController,
            private: true
        },
        Modificar:{
            path: "usuarios/Modificar/index.html",
            controller: modificarUsuariosControlador , 
            private: true 
        }
        
    },
    factura:{
         "/":{
            path: "Factura/index.html",
            controller: facturaController,
            private: true
         }
    },empresaModificar:{

        "/":{
           path: "EmpresaModificar/index.html",
            controller: empresaModificarController,
            private: true 
        }
    }
    







}