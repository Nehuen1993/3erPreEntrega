import { Router } from 'express';
import  { Users } from '../dao/factory.js';
import { postAgregarCarrito, getCarrito, postCorreo } from '../controllers/carrito.controllers.js';


const router = Router();
const userServices = new Users();

router.post ("/agregarCarrito", postAgregarCarrito)
router.get ("/carrito", getCarrito)
router.post ("/correo", postCorreo)


export default router