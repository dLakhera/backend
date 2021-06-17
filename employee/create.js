'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
	const data = JSON.parse(event.body);
	if (typeof data.text !== 'string') {
		console.error('Validation Failed');
		callback(null, {
			statusCode: 400,
			headers: { 'Content-Type': 'text/plain' },
			body: 'Couldn\'t create the todo item.',
		});
		return;
	}

	const params = {
		TableName: "Employee16",
		Item: {
			empID: data.id,
			BU: data.bu,
			accessModifier: data.aceess,
			domain: data.domain,
			email: data.email,
			password: data.pass,
			reportsTo: data.reports,
			salary: data.salary,
			user_name: data.username,
			yearOfJoining: data.yoj
		},
	};

	// write the todo to the database
	dynamoDb.put(params, (error) => {
		// handle potential errors
		if (error) {
			console.error(error);
			callback(null, {
				statusCode: error.statusCode || 501,
				headers: { 'Content-Type': 'text/plain' },
				body: 'Couldn\'t create the todo item.',
			});
			return;
		}

		// create a response
		const response = {
			statusCode: 200,
			body: JSON.stringify(params.Item),
		};
		callback(null, response);
	});
};
