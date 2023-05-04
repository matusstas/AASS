'use strict';

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3004; // 3004 is for development without docker 
const HOST = "0.0.0.0";

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Hello from Microservice 5');
})

app.put('/api/recepts/:receptId', (req, res) => {
   const { receptId } = req.params;
console.log(receptId)
   var data = {
      "update": {
         "pharmacyId": req.body["pharmacyId"],
         "state": req.body["state"]
      }
   }
   // console.log(receptId)
   // console.log(data)
   axios.put(`http://127.0.0.1:3000/api/recepts/${receptId}`, data)
      .then((data) => {
         // console.log(data)
         return res.json(data["data"]);
      })
      .catch((err) => {
         console.error(err);
         res.status(404).json({ message: 'Recept not found' });
      });
})


app.listen(PORT, HOST, () => {
   console.log(`Microservice 1 is running on http://${HOST}:${PORT}`);
});
