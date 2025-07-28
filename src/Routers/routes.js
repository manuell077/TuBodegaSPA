import { bienvenidaController } from "../Views/Bienvenida/bienvenidaController.js"
import { empresaController } from "../Views/Empresa/empresaController.js"
import { loginController} from "../Views/Login/loginControlador.js"
import { registroController} from "../Views/Registro/registroControlador.js"
import { inventarioController} from "../Views/Inventario/inventarioController.js"
import {AgregarController} from "../Views/Inventario/Agregar/AgregarController.js"
import {ModificarController} from "../Views/Inventario/Modificar/ModificarController.js"
import { EliminarController } from "../Views/Inventario/Eliminar/EliminarController.js"


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
        },
        Eliminar:{
        path: "Inventario/Modificar/index.html",
        controller: EliminarController,
        private: true 
        }
        
    }






}