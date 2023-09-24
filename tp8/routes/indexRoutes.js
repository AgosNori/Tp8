const express = require("express");
const router = express.Router();
/* rutas para renderizar las vistas principales */
const { renderIndex, renderLogin, renderRegister, renderNewProduct, renderProductos, renderPerfil, loginSesion, createUser, getProductoId, addProducts, updateProduct, deleteProduct, getUsers, getUserId, updateUser, deleteUser, getProducts } = require("../controllers/productControllers");
const login = require("../middleware/validateLogin");
const validate = require("../middleware/validateRegister");

/* rutas para ver si renderizaba las vistas */

router.get("/", renderIndex);
/*
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/nuevoProduct", renderNewProduct);
router.get("/products", renderProductos);
router.get("/perfil", renderPerfil);
*/
/* rutas login y register */

/* GET */
router.get("/login",renderLogin);
router.get("/register",renderRegister);

/* POST */
router.post("/login",login,loginSesion);
router.post("/register",validate,createUser)


/* rutas CRUD  para los productos*/

/* GET */
router.get("/products", getProducts);
router.get("/products/nuevoProduct", renderNewProduct);
router.get('/products/:id', getProductoId);

/* POST */
router.post("/products",addProducts);

/* PUT */
router.put('/products/:id', updateProduct);

/* DELETE */
router.delete('/products/:id', deleteProduct);

/* rutas para los usuarios */

/* GET */
router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUserId);

/* PUT */
router.put('/usuarios/edit/:id', updateUser);

/* DELETE */
router.delete('/usuarios/delete/:id', deleteUser);




module.exports = router