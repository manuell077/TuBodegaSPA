import { bienvenidaController } from "../Views/Bienvenida/bienvenidaController.js"
import { empresaController } from "../Views/Empresa/empresaController.js"
import { loginController} from "../Views/Login/loginControlador.js"
import { registroController} from "../Views/Registro/registroControlador.js"
import { inventarioController} from "../Views/Inventario/inventarioController.js"
import {AgregarController} from "../Views/Inventario/Agregar/AgregarController.js"
import {ModificarController} from "../Views/Inventario/Modificar/ModificarController.js"
import {ventasController} from "../Views/Ventas/ventasController.js"
import { agregarVentaController } from "../Views/Ventas/Agregar/agregarVentaController.js"
import { modificarController } from "../Views/Ventas/Modificar/modificarController.js"

export const routers = {
     


    bienvenida:{
        path: "bienvenida/index.html",
        controller: bienvenidaController,
        private:false
        
    },
    empresa:{
         path: "empresa/index.html",
         controller: empresaController,
         private: false
         

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
    }






}