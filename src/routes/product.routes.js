import { Router } from 'express';
import  { Users } from '../dao/factory.js';
import {getProducto, getAdmin, postAgregar, putUpdate, prodDelete } from '../controllers/producto.controllers.js';

const router = Router();
const userServices = new Users();


router.get ("/producto", getProducto);
router.get ("/admin", getAdmin)
router.post ("/agregar", postAgregar)
router.put ("/update", putUpdate)
router.delete ("/delete", prodDelete)


export default router