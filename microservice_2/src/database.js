const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:8082/db2')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });