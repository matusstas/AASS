const express = require('express');
const mongoose = require('mongoose');

const Pharmacy = require('../models/pharmacy');
const Drug = require('../models/drug');

const router = express.Router();

router.get('/pharmacy/availability', async (req, res) => {
    const { drugs } = req.body;

    try {        
        //TODO list pharamacies

        res.json({ pharamcies: ["Doktor Max", "Moja lekaren"]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router

