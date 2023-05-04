const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/expedite', async (req, res) => {
    const {recipe} = req.body;
    console.log(recipe)
    try {
        axios.put('http://127.0.0.1:3001/api/pharmacy/remove', { recipe: recipe})
            .then((res) => {
                console.log(`Status: ${res.status}`);
            }).catch((err) => {
                console.error(err);
                res.status(500).send("server error");
            });

            console.log(recipe)
            console.log(recipe._id)


        axios.put(`http://127.0.0.1:3004/api/recepts/${recipe._id}`, { state: "expedited", "pharmacyId": recipe.pharmacyId })
            .then((res) => {
                console.log(`Status: ${res.status}`);
            }).catch((err) => {
                console.error(err);
                res.status(500).send("server error");
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    } finally {
        res.json({ "message": "expedited succesfully" });
    }
});


module.exports = router

