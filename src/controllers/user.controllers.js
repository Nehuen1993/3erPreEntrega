import { isValidatePassword } from '../../utils.js';
import productos from '../dao/mongo/models/Product.js';
import bcrypt from 'bcrypt'
import  { Users } from '../dao/factory.js';


const userServices = new Users();

export const getLogin = (req, res) => {
    res.render("login")
}

export const getRegister = (req, res) => {
    res.render("register")
}


export const postLogin = async (req, res) => {
        const { email, password } = req.body;
    if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" });
   console.log (userServices)
   
    const user = await userServices.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1 , isAdmin: 1, telefono: 1, _id: 1 });
    
        let products= await productos.find()
        req.session.products = products
        console.log (products)

    if (!user) {
        return res.status(400).render("login", { error: "Usuario no encontrado" });
    }

    if (!isValidatePassword(user, password)) {
        return res.status(401).render("login", { error: "Error en password" });
    }
    console.log (user)

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        isAdmin: user.isAdmin,
        telefono: user.telefono,
        id: user._id
    };

    

    if (user.isAdmin == false) {
        res.redirect("/api/sessions/producto");
    } else {
        res.redirect("/api/sessions/admin");
        
    }
    
}
    




export const getLogout = (req, res) => {
    delete req.session.user
    res.redirect("/api/sessions/login")
}



export const postRegister = async (req, res) => {
    const { first_name, last_name, email, age, password, telefono } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userServices.create({
        first_name,
        last_name,
        email,
        age,
        telefono,
        password: hashedPassword
  });

    console.log('Usuario registrado con éxito.' + user);
    res.redirect('/api/sessions/login');
    
}



export const getFailRegister = (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
}



export const getFailLogin = (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
}


