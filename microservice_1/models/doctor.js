const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    specialties: [{
        type: String,
        trim: true
    }],
    type: {
        type: String,
        required: true,
        trim: true
    },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
