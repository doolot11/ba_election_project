require('dotenv').config();
var express = require('express');
var app = express();
const mongoose = require("mongoose")
const cors = require('cors');
const MONGODB_URI = process.env.MONGODB_URI;


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

app.use("/", AllRoute)
// app.use('/upload', express.static(path.join(__dirname, '/upload')));

// const url = "mongodb://localhost:27017/nurjaz"
// const url = "mongodb://doolot928gmailcom:doolot300999@nurjazkg.ru/election?authSource=admin";  
const url = "mongodb://election:election12345@45.9.191.113:27017/election?authSource=admin";
console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI)
const port = 3002
app.listen(port, function () {
    // console.log(process.env.DB); 

    console.log('Example app listening on http://localhost:' + port);
});
