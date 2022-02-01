//Para iniciar servidor
//npm install
//nodemon index.js

/* Modulos */
const express = require('express');
const bp = require('body-parser');

const router = express.Router();

/* Instancia Express */
const app = express();

/* Middlewares */
app.use(express.static('public'));
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

/* Configuracion motor */
app.set('view engine', 'ejs')

/* Productos */

const productos = [
    {
        id: 1,
        titulo: 'Producto 1',
        precio: 500,
        miniatura: 'https://cdn3.iconfinder.com/data/icons/geek-3/24/Autobots_transformers_robot_movie-512.png'
    }
];

/* Rutas */

router.get('/', (req, res) => {
    let existe;
    if (productos.length > 0) {
        existe = true;
    }else{
        existe = false;
    }
    res.status(200).render('productos', {productos: productos, bandera: existe})
});

router.get('/:id', (req, res) => {
    if (productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == req.params.id) {
               return res.status(200).json(productos[i]);
            }
        }
    }
    res.status(404).json({error: 'Producto no encontrado'})
});

router.delete('/:id', (req, res) => {
    if (productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == req.params.id) {
                productos.splice(i, 1)
               return res.status(200).json({
                   msj: 'Producto eliminado',
                   productos: productos.length > 0 ? productos : 'No quedan productos cargados'
               });
            }
        }
    }
    res.status(404).json({error: 'Producto no encontrado'})
});

router.post('/', (req, res) => {
    let producto = req.body;
    if (productos.length > 0) {
        let ultimo = productos.length - 1
        
        producto['id'] = productos[ultimo].id + 1;
    } else {
        producto['id'] = 1;
    };
    console.log(productos);
    productos.push(producto)
    /* res.status(200).json({
        msj: 'Producto agregado',
        producto,
        productos
    }) */
    let existe;
    if (productos.length > 0) {
        existe = true;
    }else{
        existe = false;
    }
    res.status(200).render('productos', {productos: productos, bandera: existe})
});

router.put('/:id', (req, res) => {
    let producto = req.body
    let id = req.params.id;
    producto['id'] = id;

    if (productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == id) {
                productos[i] = producto;
                return res.status(200).json({
                    msj: 'Producto editado',
                    producto: producto,
                    productos
                });
            }
        }
    };
    res.status(404).json({error: 'Producto no encontrado'})

})

app.use('/api/productos', router);

/* Servidor */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
server.on('error', err => {
    console.log('Error', err);
})