const express = require('express');
const soap = require('soap');
const url = 'http://127.0.0.1:3002/order?wsdl';
const args = { pharmacyName: "testPharmacy", drugName: "mydrug", amount: 20};


soap.createClient(url, function(err, client) {
  if (err) console.error(err);
  else {
    client.makeOrder(args, function(err, response) {
      if (err) console.error(err);
      else {
        console.log(response);
      }
    });
  }
});