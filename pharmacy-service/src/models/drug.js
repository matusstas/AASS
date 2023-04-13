const mongoose = require('mongoose');

const DrugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },    
    pharmacy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
    }],
});

const Drug = mongoose.model('Drug', DrugSchema);

module.exports = Drug;
