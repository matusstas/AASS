'use strict';

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
let ejs = require('ejs')
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3005; // 3004 is for development without docker 
const HOST = "0.0.0.0";

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Hello from Microservice 6');
})

app.get('/recepts', (req, res) => {
   res.sendFile(path.join(__dirname, '/recept.html'));
})



app.listen(PORT, HOST, () => {
   console.log(`Microservice 6 is running on http://${HOST}:${PORT}`);
});
