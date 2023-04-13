const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Pharmacy = require('./models/pharmacy');
const Drug = require('./models/drug');

seed();

function seed() {
    const drugs = [
        {
            "_id": new ObjectId("000000027d35d3f07f2a5019"),
            "name": "Risperidone",
            "description": "An antipsychotic",
            "manufacturer": "Janssen",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000067d35d3f07f2a501d"),
            "name": "Ibuprofen",
            "description": "A pain reliever",
            "manufacturer": "Pfizer",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000097d35d3f07f2a5020"),
            "name": "Paracetamol",
            "description": "A fever reducer",
            "manufacturer": "Johnson & Johnson",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000007d35d3f07f2a5017"),
            "name": "Aspirin",
            "description": "A blood thinner",
            "manufacturer": "Bayer",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000017d35d3f07f2a5018"),
            "name": "Acetaminophen",
            "description": "A pain reliever",
            "manufacturer": "Tylenol",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000037d35d3f07f2a501a"),
            "name": "Naproxen",
            "description": "A pain reliever",
            "manufacturer": "Aleve",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000087d35d3f07f2a501f"),
            "name": "Loratadine",
            "description": "An antihistamine",
            "manufacturer": "Claritin",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000057d35d3f07f2a501c"),
            "name": "Ranitidine",
            "description": "An acid reducer",
            "manufacturer": "Zantac",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("0000000a7d35d3f07f2a5021"),
            "name": "Omeprazole",
            "description": "A proton pump inhibitor",
            "manufacturer": "Prilosec",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("0000000c7d35d3f07f2a5023"),
            "name": "Simvastatin",
            "description": "A cholesterol-lowering drug",
            "manufacturer": "Zocor",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("0000000d7d35d3f07f2a5024"),
            "name": "Metformin",
            "description": "A diabetes medication",
            "manufacturer": "Glucophage",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("0000000e7d35d3f07f2a5025"),
            "name": "Amoxicillin",
            "description": "An antibiotic",
            "manufacturer": "GSK",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000047d35d3f07f2a501b"),
            "name": "Lisinopril",
            "description": "A blood pressure medication",
            "manufacturer": "Merck",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("000000077d35d3f07f2a501e"),
            "name": "Albuterol",
            "description": "A bronchodilator",
            "manufacturer": "ProAir",
            "price": 12.99,
        },
        {
            "_id": new ObjectId("0000000b7d35d3f07f2a5022"),
            "name": "Prednisone",
            "description": "A corticosteroid",
            "manufacturer": "Mylan",
            "price": 12.99,
        }
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
                pharmacy.drugs.push({ drug: drug })
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
