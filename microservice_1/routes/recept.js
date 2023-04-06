const express = require('express');
const mongoose = require('mongoose');

const Drug = require('../models/drug');
const Recept = require('../models/recept');

const router = express.Router();


router.post('/recepts', async (req, res) => {
    const { receptData } = req.body;

    const newRecept = new Recept(receptData);

    try {
        const insertedRecept = await newRecept.save();
        res.status(201).json(savedRecept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/recepts/:receptId', async (req, res) => {
    const { receptId } = req.params;

    try {
        const recept = await Recept.findById(receptId);
        if (!recept) {
            return res.status(404).json({ message: 'Recept not found' });
        }
        res.status(200).json(recept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.put('/recepts/:receptId', async (req, res) => {
    const { receptId } = req.params;
    const { update } = req.body;

    try {
        const recept = await Recept.findById(receptId);
        if (!recept) {
            return res.status(404).json({ message: 'Recept not found' });
        }

        try {
            const updatedRecept = await Recept.findByIdAndUpdate(receptId, update, { new: true });
            res.status(201).json(updatedRecept);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router
