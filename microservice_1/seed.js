const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Doctor = require('./models/doctor');
const Drug = require('./models/drug');
const Patient = require('./models/patient');
const Recept = require('./models/recept');

seedDrugs();
seedDoctors();
seedPatients();
// seedRecepts();

function seedDrugs() {
    const drugs = [
        {
            "_id": new ObjectId(0),
            "name": "Risperidone",
            "description": "An antipsychotic",
            "manufacturer": "Janssen",
            "price": 12.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(1),
            "name": "Ibuprofen",
            "description": "A pain reliever",
            "manufacturer": "Pfizer",
            "price": 5.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(2),
            "name": "Paracetamol",
            "description": "A fever reducer",
            "manufacturer": "Johnson & Johnson",
            "price": 3.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(3),
            "name": "Aspirin",
            "description": "A blood thinner",
            "manufacturer": "Bayer",
            "price": 2.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(4),
            "name": "Acetaminophen",
            "description": "A pain reliever",
            "manufacturer": "Tylenol",
            "price": 4.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(5),
            "name": "Naproxen",
            "description": "A pain reliever",
            "manufacturer": "Aleve",
            "price": 6.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(6),
            "name": "Loratadine",
            "description": "An antihistamine",
            "manufacturer": "Claritin",
            "price": 8.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(7),
            "name": "Ranitidine",
            "description": "An acid reducer",
            "manufacturer": "Zantac",
            "price": 7.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(8),
            "name": "Omeprazole",
            "description": "A proton pump inhibitor",
            "manufacturer": "Prilosec",
            "price": 9.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(9),
            "name": "Simvastatin",
            "description": "A cholesterol-lowering drug",
            "manufacturer": "Zocor",
            "price": 11.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(10),
            "name": "Metformin",
            "description": "A diabetes medication",
            "manufacturer": "Glucophage",
            "price": 12.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(11),
            "name": "Amoxicillin",
            "description": "An antibiotic",
            "manufacturer": "GSK",
            "price": 7.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(12),
            "name": "Lisinopril",
            "description": "A blood pressure medication",
            "manufacturer": "Merck",
            "price": 5.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(13),
            "name": "Albuterol",
            "description": "A bronchodilator",
            "manufacturer": "ProAir",
            "price": 9.99,
            "amount": 100
        },
        {
            "_id": new ObjectId(14),
            "name": "Prednisone",
            "description": "A corticosteroid",
            "manufacturer": "Mylan",
            "price": 4.99,
            "amount": 100
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

function seedDoctors() {
    const doctors = [
        {
            "_id": new ObjectId(15),
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "password": "0000",
            "specialties": ["Cardiology", "Internal Medicine"],
            "type": "doctor",
        },
        {
            "_id": new ObjectId(16),
            "name": "Jane Smith",
            "email": "janesmith@gmail.com",
            "password": "0000",
            "specialties": ["Pediatrics", "Family Medicine"],
            "type": "doctor"
        },
        {
            "_id": new ObjectId(17),
            "name": "Teddy Blue",
            "email": "teddyblue@gmail.com",
            "password": "0000",
            "specialties": ["Oncology", "Hematology"],
            "type": "doctor"
        }
    ];

    try {
        doctors.map(doctor => new Doctor(doctor).save())
        console.log('Doctors seeded successfully');

    } catch (error) {
        console.error('Error seeding doctors:', error);
        mongoose.connection.close();
    }
}

function seedPatients() {
    const patients = [
        {
            "_id": new ObjectId(18),
            "name": "Alice Smith",
            "email": "alicesmith@gmail.com",
            "password": "0000",
            "age": 30,
            "bloodType": "O+",
            "type": "patient"
        },
        {
            "_id": new ObjectId(19),
            "name": "Bob Johnson",
            "email": "bobjohnson@gmail.com",
            "password": "0000",
            "age": 50,
            "bloodType": "AB-",
            "type": "patient"
        },
        {
            "_id": new ObjectId(20),
            "name": "Charlie Brown",
            "email": "charliebrown@gmail.com",
            "password": "0000",
            "age": 25,
            "bloodType": "B+",
            "type": "patient"
        }
    ];

    try {
        patients.map(patient => new Patient(patient).save())
        console.log('Patients seeded successfully');

    } catch (error) {
        console.error('Error seeding patients:', error);
        mongoose.connection.close();
    }
}

function seedRecepts() {
    const recepts = [
        {
            "doctorId": new ObjectId('000000117d35d3f07f2a5037'),
            "patientId": new ObjectId('000000127d35d3f07f2a503b'),
            "drugIds": [
                new ObjectId('000000027d35d3f07f2a5019'),
                new ObjectId('000000067d35d3f07f2a501d'),
            ],
            "date": "2022-05-01T00:00:00Z"
        },
        {
            "doctorId": new ObjectId('000000117d35d3f07f2a5037'),
            "patientId": new ObjectId('000000147d35d3f07f2a503d'),
            "drugIds": [
                new ObjectId('000000097d35d3f07f2a5020'),
                new ObjectId('000000007d35d3f07f2a5017'),
            ],
            "date": "2022-05-01T00:00:00Z"
        },
        {
            "doctorId": new ObjectId('000000107d35d3f07f2a5036'),
            "patientId": new ObjectId('000000137d35d3f07f2a503c'),
            "drugIds": [
                new ObjectId('000000027d35d3f07f2a5019'),
                new ObjectId('000000017d35d3f07f2a5018'),
                new ObjectId('000000037d35d3f07f2a501a'),
            ],
            "date": "2022-05-01T00:00:00Z"
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