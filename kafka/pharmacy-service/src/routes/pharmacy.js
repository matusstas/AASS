const express = require('express');

const Pharmacy = require('../models/pharmacy');
const Drug = require('../models/drug');

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


const consumer = kafka.consumer({ groupId: "my-group" });

// Subscribe to a Kafka topic and log incoming messages
async function consumeMessages(topic) {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            var recipe = JSON.parse(message.value.toString());
            console.log(recipe);

            try {
                let drugs = recipe.drugs.map(element => {
                    return { "drugs.drug.name": element.name, "drugs.amount": { $gte: element.amount } };
                });

                let result = await Pharmacy.find().populate({ path: "drugs.drug", match: { $or: drugs } })
                // res.json({ pharmacies: result });


                // Choose the first one
                var pharmacyId = result[0]["_id"];
                console.log(pharmacyId);

                let pharmacy = await Pharmacy.findById(pharmacyId).populate("drugs.drug");
                recipe.drugs.forEach(recipedrug => {
                    pharmacy.drugs.forEach(pharmacydrug => {
                        if (recipedrug.drugId === pharmacydrug.drug._id.toString()) {
                            pharmacydrug.amount -= recipedrug.amount
                            pharmacydrug.reserved += recipedrug.amount
                        }
                    })
                })
                pharmacy.save()

                try {
                    axios.put('http://localhost:3004/api/recepts/' + recipe._id, {"state": "reserved", "pharmacyId": pharmacy._id})
                        .then((res) => {
                            console.log(`Status: ${res.status}`);
                        }).catch((err) => {
                            console.error(err);
                            // res.status(500).send("server error");
                        });
            
                    // res.json({ "message": "expedited succesfully" });
                } catch (error) {
                    console.error(error);
                    // res.status(500).json({ error: 'Server error' });
                }


                recipe.status = "reserved";
                recipe.pharmacyId = pharmacy._id;
                await sendMessage("topic-test2", recipe);
                console.log("OK");

            } catch (error) {
                console.error(error);
                // res.status(500).json({ error: 'Server error' });
            }


        }
    });
}

// Example usage
consumeMessages("topic-test1").catch(console.error);

const router = express.Router();

router.put('/pharmacy/availability', async (req, res) => {
    const recipe = req.body;

    try {
        let drugs = recipe.drugs.map(element => {
            return { "drugs.drug.name": element.name, "drugs.amount": { $gte: element.amount } };
        });

        let result = await Pharmacy.find().populate({ path: "drugs.drug", match: { $or: drugs } })

        res.json({ pharmacies: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/pharmacy/reserve', async (req, res) => {
    const { pharmacyId, recipe } = req.body;

    try {

        let pharmacy = await Pharmacy.findById(pharmacyId).populate("drugs.drug");
        recipe.drugs.forEach(recipedrug => {
            pharmacy.drugs.forEach(pharmacydrug => {
                if (recipedrug.drugId === pharmacydrug.drug._id.toString()) {
                    pharmacydrug.amount -= recipedrug.amount
                    pharmacydrug.reserved += recipedrug.amount
                }
            })
        })

        pharmacy.save()
        res.json({ "status": "reserved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/pharmacy/remove', async (req, res) => {
    const { recipe } = req.body;


    console.log("c-");
    console.log(recipe);
    console.log("c-");

    try {
        let pharmacy = await Pharmacy.findById(recipe["pharmacyId"]).populate("drugs.drug")
        recipe.drugs.forEach(recipedrug => {
            pharmacy.drugs.forEach(pharmacydrug => {
                if (recipedrug.drugId === pharmacydrug.drug._id.toString()) {
                    pharmacydrug.reserved -= recipedrug.amount
                }
            })
        })

        pharmacy.save()
        res.json({ "status": "removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router

