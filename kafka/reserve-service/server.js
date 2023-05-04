'use strict';
const express = require('express');
const axios = require('axios');

var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3004; 
const HOST = "0.0.0.0";

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello from Microservice 5');
})

app.put('/api/recepts/:receptId', (req, res) => {
   const { receptId } = req.params;

   var data = {
       "update": {
           "pharmacyId": req.body["pharmacyId"],
           "state": req.body["state"]
       }
   }

   axios.put(`http://localhost:3000/api/recepts/${receptId}`, data)
       .then((data) => {
           return res.json(data["data"]);
       })
       .catch((err) => {
           console.error(err);
           res.status(404).json({ message: 'Recept not found' });
       });
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 5 is running on http://${HOST}:${PORT}`);
});
