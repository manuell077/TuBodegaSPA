export function ValidarRegistro(e) {
         
    let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required') 
    })
    let password = ""
    campos.forEach(campo =>{
        
        
        switch(campo.name){
          
          //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  

          case "nombre":
            
          if(campo.value){
             
            let nombreCampo = campo.getAttribute('name')
            data[nombreCampo] = campo.value

          }
           break;

          case "password":
            
               if(ValidarPassword){
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
                password = campo;
                
               }
            
          break;

          case "repeatPassword":
            
               if(ValidarRepeticion(campo,password)){
                console.log("Si me guarde")
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
                
               }
            
          break;

          case "correo_electronico":
            
               if(ValidarCorreo){
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
               
               }
            

            break;

            case "telefono":
            
               if(ValidarTelefono){
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
                
               }
            
                          
            break;

            case "cedula":
           
            
               if(ValidarCedula){
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
                
               }
            
            break;

            case "direccion":


            if(campo.value){
               
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
                
            }
            break;
             
            

          }
    })
    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto 
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    
   
   Object.keys(data).forEach(elemento =>{ console.log( data[elemento])})

  if(cantidadCampos === cantidadObjeto){  //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    delete  data["repeatPassword"]  //Eliminamos este campo porque no es necesrio en el objeto 
    return data;
  }else{
    return false
    
  }
}

export function ValidarEspacios(e){
  
  //Se evalua si el valor que ingreso el usuario es vacio o no 
  if(!e.target.value){
       //En caso de que exista un mensaje de error que lo borre 
       if(e.target.nextSibling){
          e.target.nextSibling.remove()
          
       }

       
       //Se crea el mensaje de error 
        let error = document.createElement("span") 
        error.classList.add("mensajeError")
        error.textContent = `⛔Este campo debe completarse` 
        e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input
        
      }else{
        //Aca se evalua si algunos de estos campos es nombre o direccion ya que estos como tal solo validan que no se ingresen carateres que no son validos y no tienen en su else que elimine el mensaje de error del campo vacio
        if(e.target.name == "nombre" || e.target.name == "direccion" || e.target.name == "nombreEmpresa"){
           if(e.target.nextSibling){
          e.target.nextSibling.remove()
          }
        }
        
      }
}

export function ValidarEspaciosInventario(e){
    
  //Se evalua si el valor que ingreso el usuario es vacio o no 
  if(!e.target.value){

       //En caso de que exista un mensaje de error que lo borre 
       if(e.target.nextSibling){
          e.target.nextSibling.remove()
          
       }

       //Se crea el mensaje de error 
        let error = document.createElement("span") 
        error.classList.add("mensajeError" , "mensajeError--inventario")
        error.textContent = `⛔Este campo debe completarse` 
        e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input
        
      }else{

        //Aca se evalua si algunos de estos campos es nombre o direccion ya que estos como tal solo validan que no se ingresen carateres que no son validos y no tienen en su else que elimine el mensaje de error del campo vacio
           if(e.target.nextSibling){
          e.target.nextSibling.remove()
          }
        
        
      }


}
export function ValidarEspaciosVentas(e){
    
  //Se evalua si el valor que ingreso el usuario es vacio o no 
  if(!e.target.value){

       //En caso de que exista un mensaje de error que lo borre 
       if(e.target.nextSibling){
          e.target.nextSibling.remove()
          
       }

       //Se crea el mensaje de error 
        let error = document.createElement("span") 
        error.classList.add("mensajeError" , "mensajeError--ventas")
        error.textContent = `⛔Este campo debe completarse` 
        e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input
        

        
      }else{

        //Aca se evalua si algunos de estos campos es nombre o direccion ya que estos como tal solo validan que no se ingresen carateres que no son validos y no tienen en su else que elimine el mensaje de error del campo vacio
           if(e.target.nextSibling){
          e.target.nextSibling.remove()
          }
        
        
      }


}


export function ValidarLetras(e){
     

    let tecla =   e.key  //Se recibe la tecla que se presiono 
    const letras = /^[a-zA-Z]+$/ //Expresio nregular que evalua si es una letra 

    if(!letras.test(tecla)){    //Aca se evalua s la tecla no cumple con la expresion regular 
      e.preventDefault() //Si no cumple no la dejara marcar en el input con el preventDefault que lo que hace es prevenir un comportamiento predeterminado de un evento
      
    }
    
    
}

export function ValidarPassword(e){
     
     const password = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/ //Expresion regular de contraseña donde  "?=" indica que esta condicion se debe cumplir "." cualquier caracter y "*" significa cero o mas veces  

     if(!password.test(e.target.value)){ //Si no se cumple la condicion creara un mensaje de error 
        
      //Si existe un elemento lo borrara  para que no se sobreescriba
       if(e.target.nextSibling){
          e.target.nextSibling.remove()

        }
        //Creara el mensaje de error 
        let error = document.createElement("span") 
        error.classList.add("mensajeError","mensajeError--password")
        error.textContent = "❌El campo contraseña debe tener 6 caracteres al menos una letra  y un numero" 
        e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input    
                    
        return false; // y retornara falso mientras se valida 
     }else{
         if(e.target.nextSibling){ //Aca se evalua de que en caso de que no exista otro mensaje de error 
          e.target.nextSibling.remove()

        }


      return true;
     }
}

export function ValidarRepeticion(elemento,password){   //Recibe como parametros dos elementos el elemento en este caso hace referencia al input RepeatPassword y el password original     
        
      
      //Si los valores no llegan a ser iguales entoncescrearara un mensaje de error y retornara falso 
      if(elemento.value != password.value){
        if(elemento.nextSibling){
           
          elemento.nextSibling.remove()
        }
        

        let error = document.createElement("span") 
        error.classList.add("mensajeError","mensajeError--Repeatpassword")
        error.textContent = "❌Las contraseñas no coinciden" 
        elemento.insertAdjacentElement("afterend",error)  //Se inserta debajo del input 

        return false
      }else{
        //EN caso contrario retornara true
       if(elemento.nextSibling){
          elemento.nextSibling.remove()
        }
      return true;
      }

}

export function ValidarCorreo(e){
     
  const correo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //Expresion regular que valida la sintaxis correcta de un correo 
  
  //Si no existe se crea el mensaje de error y se retorna falso  
  if(!correo.test(e.target.value)){
     if(e.target.nextSibling){
           
          e.target.nextSibling.remove()
        }

        let error = document.createElement("span") 
        error.classList.add("mensajeError","mensajeError--correo")
        error.textContent = "❌Ingresa un correo valido" 
        e.target.insertAdjacentElement("afterend",error) 

    return false;

  }else{
     //Si llega  a existir se valida con true 
    if(e.target.nextSibling){
        e.target.nextSibling.remove()
    }
    return true;

  }

}

export function ValidarCedula(e){
  const validacionCompleta = /^[0-9]{8}$|^[0-9]{10}$/
 
  //Aqui se evalua completamente 
  if(!validacionCompleta.test(e.target.value)){
       
       if(e.target.nextSibling){
          e.target.nextSibling.remove()
        }
    let error = document.createElement("span") 
    error.classList.add("mensajeError","mensajeError--telefono")
    error.textContent = "❌Ingrese una cedula valida" 
    e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input 
    return false
  }else{

     if(e.target.nextSibling){
          e.target.nextSibling.remove()
        }

    return true    
  }
   
}

export function ValidarNumeros(e){
    
  //En esta funcion se valida que el usuario no ingrese letras y solo numeros y mande un mensaje de error mientras no se cumpla la condicion completa
  
  let tecla = e.key
   
  const teclasPermitidas = [
    "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
  ]; //Se guarda en un areglo las teclas como borrar , flecha o espacio ya que estas las tomara como si fuera letra y detentra el evento

  if(e.target.name != "nit"){
  const numero = /^[0-9]+$/
  
  //Se hace la validacion
  if(!numero.test(tecla) && !teclasPermitidas.includes(tecla)){
      console.log("Estoy en otro campo diferente a nit")
    e.preventDefault()
  }
  }else{
   const numero = /^[0-9-]+$/
 
  //Se hace la validacion
  if(!numero.test(tecla) && !teclasPermitidas.includes(tecla)){
       console.log("Estoy en nit")
    e.preventDefault()
  }
  }


}

export function ValidarTelefono(e){

  const validacionCompleta = /^[0-9]{10}$/
   //Aqui se evalua completamente 
  if(!validacionCompleta.test(e.target.value)){
        
       if(e.target.nextSibling){
          e.target.nextSibling.remove()
        }

    let error = document.createElement("span") 
    error.classList.add("mensajeError","mensajeError--telefono")
    error.textContent = "❌Ingrese un numero valido" 
    e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input 
   
    return false

  }else{

     if(e.target.nextSibling){
          e.target.nextSibling.remove()
        }

    return true    
  }

}

export function ValidarDireccion(e){
   

  let tecla = e.key//Se almacena la tecla presionada por el usuario gracias a la captura de evento 
  const direccion = /^[\w\s#\-]+$/ //La expresion regular donde se valida que el usuario escribio bien la direccion
  
  //En caso contrario que la tecla presionada no sea como en la expresion regular entonces se previene el evento y no lo deja escribir el caracter
  if(!direccion.test(tecla)){  
     
      e.preventDefault()
      
    }

}

export  function ContarCampos(formulario){

  

   const camposRequeridos= [...formulario].filter((campo)=>{
    
    if(campo.hasAttribute('required'))return campo
   })
   
   console.log(camposRequeridos.length)
  
   return camposRequeridos.length

  

}

export function ValidarNit(e){
  //En esta funcion se valida que el usuario no ingrese letras y solo numeros y mande un mensaje de error mientras no se cumpla la condicion completa 
  const validacionCompleta = /^[0-9]{5,10}-[0-9]$/
  
  //Aqui se evalua completamente 
  if(!validacionCompleta.test(e.target.value)){
       
       if(e.target.nextSibling){

          
          e.target.nextSibling.remove()
        }
    let error = document.createElement("span") 
    error.classList.add("mensajeError","mensajeError--telefono")
    error.textContent = "❌Ingrese un nit valido" 
    e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input 

    return false
  }else{

     if(e.target.nextSibling){
          e.target.nextSibling.remove()
        }

    return true    
  }
}


export function ValidarLogin(e){

    let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
          
      switch(campo.name){
     //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          case "cedula":
             
               if(ValidarCedula){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
            case "password":
             
            
               if(ValidarPassword){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
      }

    })

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    
    return data;
   }else{
    return false

  }
}

export function ValidarEmpresa(e){

     let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
          
      switch(campo.name){
     //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          case "nit":
             
               if(ValidarNit){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
            case "nombreEmpresa":
             
            
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;

            case "direccion":

                 if(ValidarDireccion){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            break;
            
            case "lineaDeAtencion":

                 if(ValidarTelefono){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            break;
             
            case "correoEmpresa":

                 if(ValidarCorreo){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            break;




      }

    })
    

    Object.keys(data).forEach(elemento => { console.log(elemento)})

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    
    console.log(cantidadObjeto)

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    
    return data;
   }else{
    return false

  }



}

export function ValidarSeleccioandor(e){



    if(e.target.selectedIndex == 0){
              console.log("El campo no tiene nada seleccionado")
               //Se crea el mensaje de error 
              let error = document.createElement("span") 
              error.classList.add("mensajeError")
              error.textContent = `⛔Este campo debe completarse` 
              e.target.insertAdjacentElement("afterend",error)  //Se inserta debajo del input
          
              return false
    }else{
                
        if(e.target.nextSibling){
          e.target.nextSibling.remove()
        }

      return true             
  }

}


export function ValidarInventario(e,agregar,imagen){
   
   

    let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
      if(agregar == false){    
      switch(campo.name){
     //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          case "nombre":
              
             if(campo.value){

                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }
            
            break;

            case "peso":
               
             if(campo.value){
              
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }
            
            break;

            case "cantidadEnStock":
               
            if(campo.value){
              
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }
           

            break;

            case "precio":
               
             if(campo.value){
              
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
                
                
             }

            break;

            

            }


      }else{
          
         switch(campo.name){
     //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          case "nombre":
              
             if(campo.value){

                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }
            
            break;

            case "peso":
               
             if(campo.value){
              
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }
            
            break;

            case "cantidadEnStock":
               
            if(campo.value){
              
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }
           

            break;

            case "precio":
               
             if(campo.value){
              
                let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
             }

            break;

            case "imagen":
              
               if(campo.files.length > 0){
                 let nombreCampo = campo.getAttribute('name')
                data[nombreCampo] = campo.value
               }

            break;

            }

      }

    })

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
     
    data["imagen"] = imagen.src
      
     

    
   
    return data;

   }else{
    return false

  }


}

export function ValidarVentas(e){


   let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
          
      switch(campo.name){
      //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          case "nombreCliente":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
            
            case "cantidadAbonado":
             
               if(campo.value || campo.value != 0){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
           
            case "fechaHora":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;
            
            case "fkUsuarios":
             
            
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;


      }

    })
    

    Object.keys(data).forEach(elemento => { console.log(elemento)})

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    
    console.log(cantidadObjeto)

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    
    return data;
   }else{
    return false

  }
}


export function ValidarPedidos(e){
  let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
          
      switch(campo.name){
      //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          
            
            case "terminado":
             
               if(campo.value || campo.value != 0){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
           
            case "fkVenta":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;
            
            


      }

    })
    

    Object.keys(data).forEach(elemento => { console.log(elemento)})

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    
    console.log(cantidadObjeto)

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    
    return data;
   }else{
    return false

  }
}

export function ValidarPedidosModificar(e){
  let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
          
      switch(campo.name){
      //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          
            
            case "terminado":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
           
            case "fecha":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;
            
            


      }

    })
    

    Object.keys(data).forEach(elemento => { console.log(elemento)})

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    
    console.log(cantidadObjeto)

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    
    return data;
   }else{
    return false

  }
}

export function ValidarFactura(e){
    let data = {};
    e.preventDefault();
    //Aca se cuentan todos los campos del formulario que son requeridos 
    const campos = [...e.target].filter((elemento) =>{
          
          return elemento.hasAttribute('required')
    })
    
    campos.forEach(campo=>{
          
      switch(campo.name){
      //Segun el nombre de campo se valida con su respectiva funcion y si devuelve true se añade al objeto data  
          
            
            case "cedula":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value
               }
            
            break;
           
            case "direccion":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

             case "telefono":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

            case "fkPedido":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

            case "correo":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

            case "fecha":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

            case "medioDePago":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

            case "iva":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;

            case "valorTotal":
             
               if(campo.value){
                 let nombreCampo = campo.getAttribute('name')
                 data[nombreCampo] = campo.value 
               }
            
            break;


            
            


      }

    })
    

    Object.keys(data).forEach(elemento => { console.log(elemento)})

    const cantidadObjeto = Object.keys(data).length //Aca obtenemos la longitud del objeto
    const cantidadCampos =  ContarCampos(e.target) //Aca contamos todos los campos que tenemos en el formulario 
    
    console.log(cantidadObjeto)

    if(cantidadCampos === cantidadObjeto){   //Se evalua si tienen la misma cantidad que quiere decir que todos los campos ya fueron validados correctamente
    
    return data;
   }else{
    return false

  }
}

