const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    drugs: [{
        drug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drug',
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
            default: 100
        },
        reserved: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
    }],
});

const Pharmacy = mongoose.model('Pharmacy', PharmacySchema);

module.exports = Pharmacy;
