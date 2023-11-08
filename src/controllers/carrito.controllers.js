
import productos from '../dao/mongo/models/Product.js';
import cartModel from '../dao/mongo/models/Carrito.js';
import nodemailer from 'nodemailer'
import twilio from 'twilio';


const TWILIO_ACCOUNT_SID = "ACed11036747b3250e4edb5c558f448a60"
const TWILIO_AUTH_TOKEN = "7e768a29f9c731793131bb179497d906"
const TWILIO_NUMBER = "+12012283519"



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user:"nehuengiannone@gmail.com",
        pass:"akyh jumo zwqb etjg"
    }
})




export const postAgregarCarrito = async (req, res) => {
    try {
        const { pid } = req.body;
        console.log(pid);
        const producto = await productos.findById(pid);
        

        if (!producto) {
            res.send({ status: "error", error: "Producto no encontrado" });
            return;
        }
        const userId = req.session.user.id;
        console.log(userId);
        console.log(producto);
        

        let carrito = await cartModel.findOne({ _id:userId });

        if (!carrito) {
            carrito = new cartModel({ userId, _id:userId, productos:[] });
        }

        const productoExistente = carrito.products ? carrito.products.find(item => item.nombre === producto.nombre) : null;

if (producto.stock===0) {
    res.send({ status: "error", error: "No hay stock disponible" });
    
} else {
    

        if (productoExistente) {
            productoExistente.cantidad += 1;
            producto.stock -= 1

        } else {
            
            const carritoItem = {
            
                    
                        nombre: producto.nombre,
                        categoria: producto.categoria,
                        precio: producto.precio,
                        cantidad: 1
                               
            };
            carrito.products.push(carritoItem); 
            producto.stock -= 1
        }

        await carrito.save(); 
        await producto.save()

        console.log("producto agregado al carrito");
        res.redirect('/api/sessions/producto');
    }

    } catch (error) {
        console.log(error);
    }
}


export const getCarrito = async(req, res) => {

        
            const { first_name, last_name, email, age, isAdmin} = req.session.user

        const userId = req.session.user.id;
        console.log(userId);
            try {
               
                let carrito = await cartModel.findOne({ _id:userId });
                
                    if(carrito) {
                        const carritoProperties = carrito.products.map(producto => {
                            return {
                                nombre: producto.nombre,
                                precio: producto.precio,
                                cantidad: producto.cantidad,
                                subtotal: producto.precio * producto.cantidad,
                               };
                    
                })
                const total = carritoProperties.reduce((acc, producto) => acc + producto.subtotal, 0);
                console.log("el total es" + total)
                    console.log ("esto es el carrito" + carrito)
               res.render("carrito", { first_name, last_name, age, email, isAdmin, total, carrito: carritoProperties });
                }else{
                    console.log("carrito vacio")
                }
                
            } 
            catch (error) {
                console.error("Error al obtener productos:", error);
                
            }
        }

        export const postCorreo = async(req, res) => {

        
            const { first_name, last_name, email, telefono} = req.session.user
            const number = "+" + telefono

            console.log("el numero de telefono es " + number)

            const mailOptions = {
                from: "nehuengiannone@gmail.com",
                to: email,
                subject: "Gracias por tu compra",
                text: first_name + last_name + "Gracias por tu compra"
          }
            
        const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        let result = await client.messages.create({
                body: "gracias por tu compra",
                from: TWILIO_NUMBER,
                to: number,
               
             })
         
            await transporter.sendMail (mailOptions, (error, info)=>{
            if(error){
                console.log(error)
                res.send("error")
            }else{
                console.log("correo enviado", info)
                res.send ("Gracias por su compra, Se le envio un mail con los datos")
            }
         })}

