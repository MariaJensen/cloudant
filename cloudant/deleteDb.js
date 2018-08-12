'use strict';

const request = require('./request/request.js'); 

module.exports = async (dbHostname, adminUsername, adminPassword, dbName) => {

	if (!dbName || typeof dbName !== 'string') {
		throw new Error('dbName must be a non-empty string');
	}

	const dbNameRule = /^[a-z](([a-z]|[0-9]|[_$()+-/])*)$/;
		
	if (!dbNameRule.test(dbName)) {
		throw new Error('dbName is not valid');
	}

	const options = {
		method: 'DELETE',
		hostname: dbHostname, 
		path: `/${dbName}`,
		headers: {
			'Accept': 'application/json',
		},
		auth: `${adminUsername}:${adminPassword}`,
	}

	const response = await request(options); 

	if (!response.statusCode || !response.body) {
		throw new Error('something wicked');
	}

	const responseBody = JSON.parse(response.body);

	responseBody.status = response.statusCode; 

	return responseBody;
};