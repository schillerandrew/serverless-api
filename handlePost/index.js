// 'use strict';

// 3rd-party library
const dynamoose = require('dynamoose');
// to be continued...(zip locally and upload)

// create schema
const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String
})

// create model
const peopleModel = dynamoose.model('people', peopleSchema);

exports.handler = async (event) => {
  console.log(event.queryStringParameters);

  let {id,name,phone} = event.queryStringParameters;
  let person = {id,name,phone};

  let response = {statusCode: null, body: null};

  try {
    let newPerson = await peopleModel.create(person);
    response.statusCode = 200,
    response.body = JSON.stringify(newPerson);
  } catch(e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  
  return response;
};