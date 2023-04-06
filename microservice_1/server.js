'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('./database.js');

const recept = require('./routes/recept.js')

// Uncomment if you want to seed data
// const seed = require('./seed.js');

const app = express();
const PORT = process.env.PORT || 3000; // 3000 is for development without docker 
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use("/api", recept);

app.get('/', (req, res) => {
   res.send('Hello from Microservice 1');
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 1 is running on http://${HOST}:${PORT}`);
});
