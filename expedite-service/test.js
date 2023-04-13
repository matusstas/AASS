const axios = require('axios');
    
const data = { recipe: {
	"_id": "642eecbefb9f560882b23103",
	"doctor": "Jon Doe",
	"patient": "Alice Smith",
	"state": "created",
	"drugs": [
		{
			"drugId": "000000027d35d3f07f2a5019",
			"amount": 2,
			"_id": "642eecbefb9f560882b23104"
		},
		{
			"drugId": "000000067d35d3f07f2a501d",
			"amount": 1,
			"_id": "642eecbefb9f560882b23105"
		}
	],
	"__v": 0
}};
    
axios.post("http://127.0.0.1:3003/api/expedite", data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
    });