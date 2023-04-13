const mongoose = require('mongoose');

// mongoose.connect('mongodb://mongo:27017/db')
mongoose.connect('mongodb://localhost:8082/db')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });