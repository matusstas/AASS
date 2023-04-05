const mongoose = require('mongoose');

const ReceptSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    drugIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drug',
        required: true
    }],
    date: {
        type: Date
    }
});

const Recept = mongoose.model('Recept', ReceptSchema);

module.exports = Recept;
