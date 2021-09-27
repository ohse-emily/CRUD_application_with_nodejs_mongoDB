const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');   //built-in 

const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080; 

const connectDB = require('./server/database/connection');

// log requests
app.use(morgan("tiny"));

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

// set view engine
app.set("view engine", "ejs");
// views 안에 ejs 폴더를 만들어 사용시 아래처럼 path 설정해줘야함 
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})



