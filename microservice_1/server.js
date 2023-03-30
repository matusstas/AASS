'use strict';

const express = require('express');

const PORT = 80;
const HOST = "0.0.0.0";

const app = express();

app.get('/', (req, res) => {
   res.send('Hello from Microservice 1');
})

app.listen(PORT, HOST, () => {
   console.log(`Microservice 1 is running on http://${HOST}:${PORT}`);
});
