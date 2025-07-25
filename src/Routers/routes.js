import { bienvenidaController } from "../Views/Bienvenida/bienvenidaController"
import { empresaController } from "../Views/Empresa/empresaController"

export const routers = {
     

    


    bienvenida:{
        path: "bienvenida/index.html",
        controller: bienvenidaController,
        private:false
    },
    "":{
         path: "empresa/index.html",
         controller: empresaController,
         private: false
    }





}