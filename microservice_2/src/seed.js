const mongoose = require('mongoose');

const Pharmacy = require('./models/pharmacy');
const Drug = require('./models/drug');

seed();

function seed() {
    const drugs = [
        {
            "name": "Risperidone",
            "description": "An antipsychotic",
            "manufacturer": "Janssen",
            "price": 12.99,
        },
        {
            "name": "Ibuprofen",
            "description": "A pain reliever",
            "manufacturer": "Pfizer",
            "price": 5.99,
        },
        {
            "name": "Paracetamol",
            "description": "A fever reducer",
            "manufacturer": "Johnson & Johnson",
            "price": 3.99,
        },
        {
            "name": "Aspirin",
            "description": "A blood thinner",
            "manufacturer": "Bayer",
            "price": 2.99,
        },
        {
            "name": "Acetaminophen",
            "description": "A pain reliever",
            "manufacturer": "Tylenol",
            "price": 4.99,
        },
    ];

    const phramcies = [
        {
            "name": "Doktor Max",
            "address": "Dlha 485, Bratislava-Petrzalka",
        },
        {
            "name": "Moja lekaren",
            "address": "Rovna 97, Bratislava-Ruzinov",
        }
    ];

    try {
        let d = drugs.map(drug => new Drug(drug))
        let p = phramcies.map(drug => new Pharmacy(drug))

        p.forEach(pharmacy => {
            d.forEach(drug => {
                pharmacy.drugs.push({drug: drug})
            })            
        })

        p.forEach(pharmacy => pharmacy.save())
        d.forEach(drug => drug.save())
        console.log('seeded successfully');

    } catch (error) {
        console.error('Error seeding drugs:', error);
        mongoose.connection.close();
    }
}
