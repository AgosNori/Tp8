const bcrypt = require("bcrypt");
const producto = require("../model/modelProduct");
const usuarios = require("../model/modelUser");


const renderIndex = (req, res) => {
    res.render("index")
}
const renderLogin = (req, res) => {
    res.render("login", { errors: [] })
}
const renderRegister = (req, res) => {
    res.render("register", { errors: [] })
}
const renderNewProduct = (req, res) => {
    res.render("nuevoProducto", { errors: [] })
}
const renderProductos = (req, res) => {
    res.render("productos", { errors: [] })
}
const renderPerfil = (req, res) => {
    res.render("perfil")
}


const loginSesion = async (req, res) => {
    const { email_usuario, contraseña } = req.body;
    try {
        const user = await usuario.findOne({ where: { email_usuario } });
        if (!user) {
            return res.status(404).send("Usuario no encontrado :(");
        }
        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (passwordMatch) {
            console.log("Contraseña correcta :)");
            req.session.usuario = user;
            res.render("Perfil", { usuario: user });
        } else {
            console.log("Contraseña incorrecta :(");
            res.status(401).send("Contraseña Incorrecta :(");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al autenticar el usuario")
    }
};

const createUser = async (req, res) => {
    const { nom_usuario, email_usuario, contraseña, userName, fecha_nac } = req.body;
    try {
        const saltsRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltsRounds);
        const newUser = await usuarios.create({
            nom_usuario,
            email_usuario,
            contraseña: hashedPassword,
            userName,
            fecha_nac
        });
        console.log("Usuario creado con Exito :)");
        res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al crear el usuario :(");
    }

};

const getUsers = async (req, res) => {
    try {
        const users = await usuarios.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener los usuarios");
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nom_usuario, email_usuario, contraseña, userName, fecha_nac } = req.body;
    try {
        const user = await usuarios.findByPk(id);
        if (!user) {
            return res.status(404).sened("Usuario no encontrado :(");
        }
        await user.update({
            nom_usuario, email_usuario, contraseña, userName, fecha_nac
        });
        res.status(200).send("Usuario actualizado con Exito :)");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el usuario :(");
    }
};


const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await usuario.findByPk(id);
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "ususario No encontarado" })
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await usuarios.findByPk(id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        await user.destroy();
        res.status(200).send("Usuario eliminado con Exito");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al eliminar usuario ")
    }
};

/* controllers de los productos */
/*
const addProducts = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        console.log(req.body);
        const newProduct = await producto.create({
            name,
            description,
            price,
        });
        console.log("Producto creado con exito :)");
        const products = await renderProductos.findAll();
        res.render("productos", { products });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al crear el producto"});
    }
};*/
const addProducts = async (req, res) => {
    try {
        const { nom_producto, descripcion_producto, precio_producto } = req.body;
        console.log(req.body);

        // Crear un nuevo producto
        const newProduct = await producto.create({
            nom_producto,
            descripcion_producto,
            precio_producto,
        });

        console.log("Producto creado con éxito :)");

        // Obtener la lista de productos actualizada después de crear el nuevo producto
        const products = await producto.findAll();

        // Renderizar la vista "productos" y pasar la lista de productos
        res.render("productos", { products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al crear el producto" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await producto.findAll();
        res.render("productos", { products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al obtener los productos" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_producto, descripcion_producto, precio_producto } = req.body;
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" })
        }
        product.nom_producto = nom_producto;
        product.descripcion_producto = descripcion_producto;
        product.precio_producto = precio_producto;
        await product.save();
        res.status(200).send("Actualizado con exito")
        //res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al actualizar el producto" })
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(400).json({ error: "Producto no encontrado" });
        }
        await product.destroy({
            where: { id_producto: id }
        });
        res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al eliminar el producto" })
    }
};


const getProductoId = async (req, res) => {
    try {
        const { id } = req.params;

        const productId = await producto.findByPk(id);
        res.status(200).json(productId);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Producto no encontrado" })
    }
};

module.exports = { addProducts, getProducts, updateProduct, deleteProduct, renderIndex, renderLogin, renderNewProduct, renderRegister, renderProductos, renderPerfil, loginSesion, createUser, getUsers, updateUser, getUserId, deleteUser, getProductoId }