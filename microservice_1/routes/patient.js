const express = require('express');
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const Drug = require('../models/drug');
const Patient = require('../models/patient');
const Recept = require('../models/recept');

const router = express.Router();


  router.get('/patients/:patientId/doctors', async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const receipts = await Recept.find({ 'patientId': patientId }).populate('doctorId');
        if (receipts.length === 0) {
            return res.status(404).json({ error: 'Doctors not found for this patient' });
        }

        var doctors = [];
        receipts.forEach(function(receipt) {
            const doctor = receipt.doctorId;
            console.log(doctor);
            if (!doctors.includes(doctor)) {
                doctors.push(doctor);
            }
        });

        res.status(201).json(doctors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/doctors/:doctorId', async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(201).json(doctor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = router

