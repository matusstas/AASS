const express = require('express');

const Pharmacy = require('../models/pharmacy');
const Drug = require('../models/drug');

const router = express.Router();

router.put('/pharmacy/availability', async (req, res) => {
    const recipe  = req.body;

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

    console.log(pharmacyId);
    console.log(recipe);

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
    const { pharmacyId, recipe } = req.body;

    try {
        let pharmacy = await Pharmacy.findById(pharmacyId).populate("drugs.drug")
        recipe.drugs.forEach(recipedrug => {
            pharmacy.drugs.forEach(pharmacydrug => {
                if (recipedrug.drugId === pharmacydrug.drug._id.toString()) {
                    pharmacydrug.reserved -= recipedrug.amount
                }
            })
        })

        pharmacy.save()

        res.send("removed");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router

