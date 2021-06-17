'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "Leaves",
    Key: {
      empID: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':startDate': data.start,
      ':endDate': data.end,
      ':typeOfLeave': data.type_of_leaves,
      ':no_of_leaves': data.numLeaves
    },
    UpdateExpression: 'SET startDate = :startDate, endDate = :endDate, typeOfLeave = :typeOfLeave, no_of_leaves = :no_of_leaves',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
