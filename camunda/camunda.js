import { Client, Variables, logger } from 'camunda-external-task-client-js';
import axios from 'axios';
// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'getDrugs'
client.subscribe('getDrugs', async function ({ task, taskService }) {
  // Put your business logic here
  var data;
  // // Get a process variable
  await axios.get("http://127.0.0.1:3000/api/drugs")
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      data = res.data;
    }).catch((err) => {
      console.error(err);
    });

  var drugs = data.map(function (e) {
    return {
      "label": e["name"],
      "value": e["_id"]
    };
  });
  // console.log(drugs)
  // Set the value for the process variable
  var processVariables = new Variables();

  processVariables.set("drugs", drugs);
  await taskService.complete(task, processVariables);
});


client.subscribe('saveRecipe', async function ({ task, taskService }) {
  // Put your business logic here
  var data = {
    "doctor": task.variables.get("doctor"),
    "patient": task.variables.get("patient"),
    "drugs": [{
      drugId: task.variables.get("drug1"),
      amount: task.variables.get("amount1")
    },
    {
      drugId: task.variables.get("drug2"),
      amount: task.variables.get("amount2")
    }],
    "state": "created"
  };
  // // Get a process variable
  await axios.post("http://127.0.0.1:3000/api/recepts", data)
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      // data = res.data;
    }).catch((err) => {
      console.error(err);
    });

  await taskService.complete(task);
});


client.subscribe('getRecipes', async function ({ task, taskService }) {
  // Put your business logic here
  var data;
  // // Get a process variable
  await axios.get("http://127.0.0.1:3000/api/recepts")
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      data = res.data;
    }).catch((err) => {
      console.error(err);
    });

  var recipes = data.map(function (e) {
    return {
      "label": e["doctor"],
      "value": e["_id"]
    };
  });
  // console.log(drugs)
  // Set the value for the process variable
  var processVariables = new Variables();

  processVariables.set("recipes", recipes);
  await taskService.complete(task, processVariables);
});

client.subscribe('availability', async function ({ task, taskService }) {
  // Put your business logic here
  var recipe, data;
  await axios.get("http://127.0.0.1:3000/api/recepts/" + task.variables.get("recipeID"))
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      recipe = res.data;
    }).catch((err) => {
      console.error(err);
    });


  await axios.put("http://127.0.0.1:3001/api/pharmacy/availability", recipe)
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      data = res.data.pharmacies;
    }).catch((err) => {
      console.error(err);
    });
  console.log(data)
  var pharmacies = data.map(function (e) {
    return {
      "label": e["name"],
      "value": e["_id"]
    };
  });
  var processVariables = new Variables();

  processVariables.set("pharmacies", pharmacies);
  await taskService.complete(task, processVariables);
});


client.subscribe('reserve', async function ({ task, taskService }) {
  // Put your business logic here
  var recipe, data1, data2;
  await axios.get("http://127.0.0.1:3000/api/recepts/" + task.variables.get("recipeID"))
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body recept: ', res.data);
      recipe = res.data;
    }).catch((err) => {
      console.error(err);
    });

  data1 = {
    "recipe": recipe,
    "pharmacyId": task.variables.get("pharmacyID")
  }

  await axios.put("http://127.0.0.1:3001/api/pharmacy/reserve", data1)
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      // data = res.data.pharmacies;
    }).catch((err) => {
      console.error(err);
    });
  var data2 = {
    "state": "reserved",
    "pharmacyId": task.variables.get("pharmacyID")
  }
  await axios.put("http://127.0.0.1:3004/api/recepts/" + task.variables.get("recipeID"), data2)
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      // data = res.data.pharmacies;
    }).catch((err) => {
      console.error(err);
    });

  await taskService.complete(task);
});

client.subscribe('expedite', async function ({ task, taskService }) {
  // Put your business logic here
  var recipe;
  await axios.get("http://127.0.0.1:3000/api/recepts/" + task.variables.get("recipeID"))
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      console.log('Body recept: ', res.data);
      recipe = res.data;
    }).catch((err) => {
      console.error(err);
    });

  console.log(recipe)
  await axios.post("http://127.0.0.1:3003/api/expedite", {"recipe": recipe})
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      console.log('Body exped: ', res.data);
      // data = res.data.pharmacies;
    }).catch((err) => {
      console.error(err);
    });

  await taskService.complete(task);
});