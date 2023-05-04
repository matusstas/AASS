'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('./database.js');
var cors = require('cors')

const recept = require('./routes/recept.js')

const app = express();
const PORT = process.env.PORT || 3000; // 3000 is for development without docker 
const HOST = "0.0.0.0";

app.use(cors())
app.use(bodyParser.json());
app.use("/api", recept);

app.get('/', (req, res) => {
   res.send('Hello from Microservice 1');
})

app.get('/api/seed', (req, res) => {
   require('./seed.js');
   res.send('Data seeded');
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 1 is running on http://${HOST}:${PORT}`);
});
