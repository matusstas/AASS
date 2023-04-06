'use strict';

const express = require('express');
var axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001; // 3001 is for development without docker 
const HOST = "0.0.0.0";

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Hello from Microservice 5');
})

app.get('/recepts/:receptId', (req, res) => {
   const { receptId } = req.params;

   axios.get(`http://localhost:3000/api/recepts/${receptId}`)
      .then(data => res.json(data["data"]))
      .catch((err) => {
         return res.status(404).json({ message: 'Recept not found' });
      });
})


app.listen(PORT, HOST, () => {
   console.log(`Microservice 1 is running on http://${HOST}:${PORT}`);
});
