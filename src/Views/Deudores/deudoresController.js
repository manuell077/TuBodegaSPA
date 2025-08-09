import { ObtenerDeudores } from "../../Helpers/Request/Ventas";

export const deudoresController = async() =>{
    // Datos de ejemplo
const deudores = await ObtenerDeudores()

const main = document.querySelector("#app")
// Crear cada deudor
deudores.forEach(d => {
    const divDeudor = document.createElement("div");
    divDeudor.classList.add("deudor");

    const pNombre = document.createElement("p");
    pNombre.innerHTML = `<strong>NOMBRE:</strong> ${d.nombreCliente}`;

    const pDeuda = document.createElement("p");
    pDeuda.innerHTML = `<strong>DEUDA:</strong> $${d.deuda.toLocaleString("es-CL")}`;
    

    
    divDeudor.appendChild(pNombre);
    divDeudor.appendChild(pDeuda);


    
    main.append(divDeudor)
});


}