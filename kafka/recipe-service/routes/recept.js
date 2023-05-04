const express = require('express');
const mongoose = require('mongoose');

const Drug = require('../models/drug');
const Recept = require('../models/recept');

const { Kafka } = require("kafkajs");

// Define Kafka broker(s) to connect to
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
});


// Create a Kafka producer instance
const producer = kafka.producer();

// Send a message to a Kafka topic
async function sendMessage(topic, message) {
    await producer.connect();
    await producer.send({
        topic,
        messages: [
            {
                value: JSON.stringify(message)
            }
        ]
    });
    await producer.disconnect();
}


const router = express.Router();

router.post('/recepts', async (req, res) => {
    const receptData = req.body;

    receptData["state"] = "created";
    const newRecept = new Recept(receptData);

    try {
        const insertedRecept = await newRecept.save();
        await sendMessage("topic-test1", insertedRecept);
        res.status(201).json(insertedRecept);
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

    console.log(receptId);

    try {
        const recept = await Recept.findById(receptId).populate("drugs.drugId");
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


router.get('/drugs', async (req, res) => {
    try {
        const drugs = await Drug.find();
        res.status(200).json(drugs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/recepts', async (req, res) => {
    try {
        const recepts = await Recept.find().populate("drugs.drugId");
        res.status(200).json(recepts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router
