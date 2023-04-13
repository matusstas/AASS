'use strict';
const express = require('express');
require('./database.js');

const pharmacy = require('./routes/pharmacy.js')
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001; // 3001 is for development without docker 
const HOST = "0.0.0.0";

app.use(cors())
app.use(express.json());
app.use("/api", pharmacy);

app.get('/', (req, res) => {
   res.send('Hello from Microservice 2');
})

app.get('/api/seed', (req, res) => {
   require('./seed.js');
   res.send('Data seeded');
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 2 is running on http://${HOST}:${PORT}`);
});
