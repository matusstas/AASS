'use strict';
const express = require('express');
const soap = require('soap');

const Order = require('./models/order');

require('./database.js');

// const seed = require('./seed.js'); seeeding needs more work

const app = express();
const PORT = process.env.PORT || 3002; // 3002 is for development without docker 
const HOST = "0.0.0.0";

app.get('/', (req, res) => {
   res.send('Hello from Microservice 3');
})

const service = {
   My_Service: {
      My_Port: {
         makeOrder(args) {
            Order.create({
               pharmacy: args.pharmacyName,
               drugName: args.drugName,
               amount: amount
            });
            console.log(args);
            return { state: "order accepted" }
         }
      }
   }
};

var xml = require('fs').readFileSync('src/myservice.wsdl', 'utf8');

app.listen(PORT, HOST, () => {
   console.log(`Microservice 3 is running on http://${HOST}:${PORT}`);
   soap.listen(app, '/order', service, xml, function () {
      console.log('soap server initialized');
   });
});
