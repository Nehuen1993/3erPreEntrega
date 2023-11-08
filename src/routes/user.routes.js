import { Router } from 'express';
import  { Users } from '../dao/factory.js';
import { getLogin, getRegister, postLogin, getLogout, postRegister, getFailRegister, getFailLogin } from '../controllers/user.controllers.js';


const router = Router();
const userServices = new Users();

router.get("/login", getLogin);
router.get ("/register", getRegister);
router.post ("/login", postLogin);
router.get ("/logout", getLogout)
router.post ("/register", postRegister)
router.get ("/failregister", getFailRegister)
router.get ("/faillogin", getFailLogin)


export default router