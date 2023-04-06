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
    drugIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drug',
    }],
});

const Pharmacy = mongoose.model('Pharmacy', PharmacySchema);

module.exports = Pharmacy;
