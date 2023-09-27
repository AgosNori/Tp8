// requerir express 
const express = require("express");
// crear la constante app 
const app = express();
// crear la constante del puerto
const PORT = 3000;
// requerir express session
const session = require("express-session");

const cors = require("cors");
// motor de plantillas
app.set("view engine","ejs")
app.use(cors())
// para poder ver los archivos que tenga guardado dentro de la carpeta public
app.use(express.static("public"));

// para poder leer todos los datos de un formulario
app.use(express.urlencoded({extends:true}));

// session
app.use(session({
    secret: 'miCapiBello', 
    resave: false,
    saveUninitialized: true,
}));

// para poder leer todos los datos de un formulario
app.use(express.json());

// RUTA PRINCIPAL
app.use("/",require("./routes/indexRoutes"))
app.use('/login',require('./routes/indexRoutes'))
app.use('/register',require('./routes/indexRoutes'));
app.use('/products',require('./routes/indexRoutes'));
app.use('/usuarios',require('./routes/indexRoutes'));
app.use('/products/:id',require('./routes/indexRoutes'));
app.use('/usuarios/edit/:id',require('./routes/indexRoutes'));
app.use('/usuarios/delete/:id',require('./routes/indexRoutes'));



// la aplicacion se esta escuchando en el puerto 3000
app.listen(PORT,()=>{
    console.log("This server on ",PORT)
})