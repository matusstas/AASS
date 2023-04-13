const mongoose = require('mongoose');

const ReceptSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true,
        trim: true
    },
    patient: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    drugs: [{
        drugId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drug',
            required: true
        },
        amount: {
            type: Number,
            min: 0,
            required: true
        }
    }]
});

const Recept = mongoose.model('Recept', ReceptSchema);

module.exports = Recept;
