var express = require('express');
var app = express();
const mongoose = require("mongoose")
const cors = require('cors');
// const path = require('path');
// require('dotenv').config()

// app.use(cors());'https://nurjazkg.ru:3000, http://localhost:3000'
const allowedOrigins = ['https://nurjazkg.ru', 'http://localhost:3000'];

app.use(cors());

const request = require("request-promise")
const cheerio = require("cheerio")

const URL = "https://shailoo.gov.kg/kg/"
app.get('/', async function (req, res) {

    await res.send('<h1 style="color:blue;">Hello World!</h1>');
    const response = await request(URL)
    const $ = cheerio.load(response)

    console.log($);


});

app.use(express.json())
app.use(express.static(__dirname))
// app.use('/upload', express.static(path.join(__dirname, '/upload')));

// const url = "mongodb://localhost:27017/nurjaz"
const url = "mongodb://nurjaz_123:nurjaz_321@nurjazkg.ru:27017/nurjaz";

mongoose.connect("mongodb://localhost:27017/election")
app.listen(3001, function () {
    console.log('Example app listening on port 3000! on http://localhost:3001');
});
