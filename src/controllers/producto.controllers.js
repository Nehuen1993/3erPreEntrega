import productos from '../dao/mongo/models/Product.js';




export const getProducto = async(req, res) => {
    if (!req.session.user ) {
                return res.redirect("login")
            }
        
            const { first_name, last_name, email, age, isAdmin, _id} = req.session.user
            try {
               
                const products= await productos.find();
                const productsWithOwnProperties = products.map(producto => {
                    return {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        _id: producto._id
                    };
                });
                
                res.render("producto", { first_name, last_name, age, email, isAdmin, products: productsWithOwnProperties });
                
            } catch (error) {
                console.error("Error al obtener productos:", error);
                
            }
        }
    

export const getAdmin = async(req, res) => {
    if (!req.session.products) {
                return res.redirect("login")
            }
        
            const { first_name, last_name, email, age, isAdmin} = req.session.user
            try {
               
                const products= await productos.find();
                const productsWithOwnProperties = products.map(producto => {
                    return {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        stock: producto.stock,
                        _id:producto._id
                    };
                });
                
                res.render("admin", { first_name, last_name, age, email, isAdmin, products: productsWithOwnProperties });
                
            } catch (error) {
                console.error("Error al obtener productos:", error);
                
            }
            
        }
    

export const postAgregar = async (req, res) => {
        try {
        let {nombre, categoria, precio, stock, imagen} = req.body
        if (!nombre || !categoria || !precio || !stock || !imagen ) {
            res.send({status: "error", error: "Faltan datos"})
        }
       
        let result = await productos.create({nombre, categoria, precio, stock, imagen, })
        
        console.log ("producto agregado" + result)
        res.redirect('/api/sessions/admin');
    } catch (error) {
        console.log(error)
    }
    
}

        export const putUpdate = async (req, res) => {
            try {
                let {nombre, categoria, precio, stock, imagen, id} = req.body
          console.log ("este es el pide a modficar",req.body)
              if (!nombre || !categoria || !precio || !stock || !imagen) {
                res.send({ status: "error", error: "Faltan datos" });
                console.log("sali aca")
                return;
              }
          
              const result = await productos.updateOne({ _id: id }, { nombre, categoria, precio, stock, imagen });
              console.log("llegue acá")
          
              res.status(200).send({ status: 'success', message: 'Producto eliminado con éxito' });
            } catch (error) {
              console.log(error);
              res.status(500).send({ status: "error", error: "Error al actualizar el producto" });
            }
          };


export const prodDelete = async (req, res) => {
            try {
                const productoId = req.body.id
                console.log(productoId)
                const result = await productos.deleteOne({ _id: productoId });

                
        
                if (result.deletedCount === 1) {
                    
                    res.status(200).send({ status: 'success', message: 'Producto eliminado con éxito' });
                } else {
                    res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ status: 'error', message: 'Error al eliminar el producto' });
            }
        };
