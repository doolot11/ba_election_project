var express = require('express');
var app = express();
const mongoose = require("mongoose")
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();


const AllRoute = require("./src/route/allRoute")

const allowedOrigins = ['https://nurjazkg.ru', 'http://localhost:3000'];

app.use(cors());

const URL = "https://shailoo.gov.kg/kg/"
app.get('/', function (req, res) {

    res.send(`<h1 style="color:gray;">Hello World! 
        <p>${"data"}</p>
        </h1>`);

});

app.use(express.json())
app.use(express.static(__dirname))

app.use("/api", AllRoute)
// app.use('/upload', express.static(path.join(__dirname, '/upload')));

// const url = "mongodb://localhost:27017/nurjaz"
// const url = "mongodb://doolot928gmailcom:doolot300999@nurjazkg.ru/election?authSource=admin";  
const url = "mongodb://election:election12345@45.9.191.113:27017/election?authSource=admin"; 
// console.log(process.env.DB);

mongoose.connect(process.env.DB)    
app.listen(3001, function () { 
    // console.log(process.env.DB); 
    
    console.log('Example app listening on port 3000! on http://localhost:3001');
});
