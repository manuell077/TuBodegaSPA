import './Styles/style.css'
import {router} from './Routers/router.js'
 

const app = document.querySelector("#app"); 



window.addEventListener('DOMContentLoaded', async () => {
  router(app)
});


