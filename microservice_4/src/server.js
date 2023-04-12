'use strict';
const express = require('express');
const expedition = require('./routes/expedition.js')
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3003; // 3003 is for development without docker 
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use("/api", expedition);

app.get('/', (req, res) => {
   res.send('Hello from Microservice 4');
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 4 is running on http://${HOST}:${PORT}`);
});
