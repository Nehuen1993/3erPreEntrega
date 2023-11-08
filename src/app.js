import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
import handlebars from 'express-handlebars'
import MongoStore from 'connect-mongo'
import usersRouter from './routes/user.routes.js'
import carritoRouter from './routes/carrito.routes.js'
import productRouter from './routes/product.routes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';




const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://nehuengiannone:Lz7n3cS0vO7ulfvk@cluster0.s1deur4.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://nehuengiannone:Lz7n3cS0vO7ulfvk@cluster0.s1deur4.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600,
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/api/sessions', usersRouter)
app.use('/api/sessions', carritoRouter)
app.use('/api/sessions', productRouter)

app.get('/', (req, res) => {
    res.send('Express Sessions!')
})
app.put('/', (req, res) => {
    res.send('Express Sessions!')
})
app.delete('/api/sessions', (req, res) => {
    res.send('Express Sessions!')
})




app.listen(8080, () => {
    console.log('Servidor en ejecución en el puerto 8080');
});