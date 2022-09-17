//import 
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;


//database connections
const option = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}
mongoose.connect(process.env.DB_URI,option);

const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open',()=> console.log("connect to the database!"));

//middle ware 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}));

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


app.use(express.static('uploads'));

//set template engine
app.set('view engine', 'ejs');


//router
app.use("",require("./routes/routes"));


app.listen(PORT,()=>{
    console.log(`server is listen port at http://localhost:${PORT}`);
});