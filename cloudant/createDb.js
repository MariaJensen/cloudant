'use strict';

const request = require('./request/request.js'); 

module.exports = async (dbHostname, adminUsername, adminPassword, dbName) => {

	const dbNameRule = /^[a-z](([a-z]|[0-9]|[_$()+-/])*)$/;

	if (!dbName || typeof dbName !== 'string' || !dbNameRule.test(dbName)) {
		throw new Error('bad dbName');
	}

	const options = {
		method: 'PUT',
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

	if (response.statusCode !== 201) {
		const err = new Error(`createDb failed
			status: ${response.statusCode}
			reason: ${responseBody.reason}`);
		err.response = responseBody;
		err.status = response.statusCode;
		throw err; 

	}

	return responseBody; 
};

