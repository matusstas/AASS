const express = require('express');
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const Drug = require('../models/drug');
const Patient = require('../models/patient');
const Recept = require('../models/recept');

const router = express.Router();

router.post('/doctors/:doctorId/patients/:patientId/recepts', async (req, res) => {
    const { doctorId, patientId } = req.params;
    const { date, drugIds } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
    }

    const receipts = await Recept.find({ 'doctorId': doctorId, 'patientId': patientId });
    if (receipts.length === 0) {
        return res.status(404).json({ error: 'Patient not found for this doctor' });
    }

    const newRecept = new Recept({
        _id: new mongoose.Types.ObjectId(),
        doctorId: doctorId,
        patientId: patientId,
        drugIds: drugIds,
        date: date
    });

    try {
        const savedRecept = await newRecept.save();
        res.status(201).json(savedRecept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/doctors/:doctorId/patients/:patientId/recepts/:receptId', async (req, res) => {
    const { doctorId, patientId, receptId } = req.params;
    const { update } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
    }

    const receipts = await Recept.find({ 'doctorId': doctorId, 'patientId': patientId });
    if (receipts.length === 0) {
        return res.status(404).json({ error: 'Patient not found for this doctor' });
    }

    try {
        const updatedRecept = await Recept.findByIdAndUpdate(
            receptId,
            update,
            { new: true } // set the `new` option to `true` to return the updated document instead of the original
        );
        res.status(201).json(updatedRecept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/doctors/:doctorId/patients/:patientId/recepts/:receptId', async (req, res) => {
    const { doctorId, patientId, receptId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const receipts = await Recept.find({ 'doctorId': doctorId, 'patientId': patientId });
        if (receipts.length === 0) {
            return res.status(404).json({ error: 'Patient not found for this doctor' });
        }

        const recept = await Recept.findById(receptId);
        if (!recept) {
            return res.status(404).json({ message: 'Recept not found' });
        }
        res.status(201).json(recept);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/doctors/:doctorId/patients/:patientId/recepts/:receptId', async (req, res) => {
    const { doctorId, patientId, receptId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const receipts = await Recept.find({ 'doctorId': doctorId, 'patientId': patientId });
        if (receipts.length === 0) {
            return res.status(404).json({ error: 'Patient not found for this doctor' });
        }

        const recept = await Recept.findById(receptId);
        if (!recept) {
            return res.status(404).json({ message: 'Recept not found' });
        }

        await Recept.findOneAndRemove({
            _id: receptId
        })
        res.status(201).json({ message: 'Deleted Recept' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/doctors/:doctorId/patients', async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const receipts = await Recept.find({ 'doctorId': doctorId }).populate('patientId');
        if (receipts.length === 0) {
            return res.status(404).json({ error: 'Patients not found for this doctor' });
        }

        var patients = [];
        receipts.forEach(function (receipt) {
            const patient = receipt.patientId;
            console.log(patient);
            if (!patients.includes(patient)) {
                patients.push(patient);
            }
        });

        res.status(201).json(patients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/patients/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const receipts = await Recept.find({ 'patientId': patientId }).populate('drugIds').populate('doctorId');

        data = {
            "patient": patient,
            "receipts": receipts
        }
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router

