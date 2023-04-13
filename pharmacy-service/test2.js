const axios = require('axios');
    
const data = { 
	pharmacyId: "6436da06681b3ebdd6f2be86",
	recipe: {
	"_id": "642eecbefb9f560882b23103",
	"doctor": "Jon Doe",
	"patient": "Alice Smith",
	"state": "created",
	"drugs": [
		{
			"name": "Risperidone",
			"amount": 2,
			"_id": "642eecbefb9f560882b23104"
		},
		{
			"name": "Ibuprofen",
			"amount": 11,
			"_id": "642eecbefb9f560882b23105"
		}
	],
	"__v": 0
}};
    
axios.put("http://127.0.0.1:3001/api/pharmacy/reserve", data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);

    }).catch((err) => {
        console.error(err);
    });

