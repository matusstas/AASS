const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Drug = require('./models/drug');
const Recept = require('./models/recept');

seedDrugs();
seedRecepts();

function seedDrugs() {
    const drugs = [
        {
            "_id": new ObjectId("000000027d35d3f07f2a5019"),
            "name": "Risperidone",
            "description": "An antipsychotic",
            "manufacturer": "Janssen"
        },
        {
            "_id": new ObjectId("000000067d35d3f07f2a501d"),
            "name": "Ibuprofen",
            "description": "A pain reliever",
            "manufacturer": "Pfizer"
        },
        {
            "_id": new ObjectId("000000097d35d3f07f2a5020"),
            "name": "Paracetamol",
            "description": "A fever reducer",
            "manufacturer": "Johnson & Johnson"
        },
        {
            "_id": new ObjectId("000000007d35d3f07f2a5017"),
            "name": "Aspirin",
            "description": "A blood thinner",
            "manufacturer": "Bayer"
        },
        {
            "_id": new ObjectId("000000017d35d3f07f2a5018"),
            "name": "Acetaminophen",
            "description": "A pain reliever",
            "manufacturer": "Tylenol"
        },
        {
            "_id": new ObjectId("000000037d35d3f07f2a501a"),
            "name": "Naproxen",
            "description": "A pain reliever",
            "manufacturer": "Aleve"
        },
        {
            "_id": new ObjectId("000000087d35d3f07f2a501f"),
            "name": "Loratadine",
            "description": "An antihistamine",
            "manufacturer": "Claritin"
        },
        {
            "_id": new ObjectId("000000057d35d3f07f2a501c"),
            "name": "Ranitidine",
            "description": "An acid reducer",
            "manufacturer": "Zantac"
        },
        {
            "_id": new ObjectId("0000000a7d35d3f07f2a5021"),
            "name": "Omeprazole",
            "description": "A proton pump inhibitor",
            "manufacturer": "Prilosec"
        },
        {
            "_id": new ObjectId("0000000c7d35d3f07f2a5023"),
            "name": "Simvastatin",
            "description": "A cholesterol-lowering drug",
            "manufacturer": "Zocor"
        },
        {
            "_id": new ObjectId("0000000d7d35d3f07f2a5024"),
            "name": "Metformin",
            "description": "A diabetes medication",
            "manufacturer": "Glucophage"
        },
        {
            "_id": new ObjectId("0000000e7d35d3f07f2a5025"),
            "name": "Amoxicillin",
            "description": "An antibiotic",
            "manufacturer": "GSK"
        },
        {
            "_id": new ObjectId("000000047d35d3f07f2a501b"),
            "name": "Lisinopril",
            "description": "A blood pressure medication",
            "manufacturer": "Merck"
        },
        {
            "_id": new ObjectId("000000077d35d3f07f2a501e"),
            "name": "Albuterol",
            "description": "A bronchodilator",
            "manufacturer": "ProAir"
        },
        {
            "_id": new ObjectId("0000000b7d35d3f07f2a5022"),
            "name": "Prednisone",
            "description": "A corticosteroid",
            "manufacturer": "Mylan"
        }
    ];

    try {
        drugs.map(drug => new Drug(drug).save())
        console.log('Drugs seeded successfully');

    } catch (error) {
        console.error('Error seeding drugs:', error);
        mongoose.connection.close();
    }
}

function seedRecepts() {
    const recepts = [
        {
            "doctor": "Jon Doe",
            "patient": "Alice Smith",
            "state": "created",
            "drugs": [
                {
                    "drugId": new ObjectId('000000027d35d3f07f2a5019'),
                    "amount": 2
                },
                {
                    "drugId": new ObjectId('000000067d35d3f07f2a501d'),
                    "amount": 1
                }
            ]
        },
        {
            "doctor": "Jon Doe",
            "patient": "Charlie Brown",
            "state": "created",
            "drugs": [
                {
                    "drugId": new ObjectId('000000047d35d3f07f2a501b'),
                    "amount": 1
                }
            ]
        },
        {
            "doctor": "Jane Smith",
            "patient": "Alice Smith",
            "state": "created",
            "drugs": [
                {
                    "drugId": new ObjectId('000000017d35d3f07f2a5018'),
                    "amount": 1
                }
            ]
        }
    ];

    try {
        recepts.map(recept => new Recept(recept).save())
        console.log('Recepts seeded successfully');

    } catch (error) {
        console.error('Error seeding recepts:', error);
        mongoose.connection.close();
    }
}
