'use strict';
const express = require('express');
// require('./database.js');

const pharmacy = require('./routes/pharmacy.js')
// const seed = require('./seed.js'); seeeding needs more work

const app = express();
const PORT = process.env.PORT || 3001; // 3001 is for development without docker 
const HOST = "0.0.0.0";

app.use(express.json());
app.use("/api", pharmacy);

app.get('/', (req, res) => {
   res.send('Hello from Microservice 2');
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 2 is running on http://${HOST}:${PORT}`);
});
