'use strict'; 

const request = require('./request/request.js');

module.exports = async (dbHostname, adminUsername, adminPassword, dbName, doc) => {

	if (!dbName || typeof dbName !== 'string') {
		throw new Error('dbName must be a non-empty string');
	}

	const dbNameRule = /^[a-z](([a-z]|[0-9]|[_$()+-/])*)$/;
		
	if (!dbNameRule.test(dbName)) {
		throw new Error('dbName is not valid');
	}

	// validate doc: 

	if (!doc || typeof doc !== 'object') {
		throw new Error('doc must be an object'); // empty allowed by cloudant? 
	}

	const keyNameRule = /^[^_]/; 

	for (let key in doc) {

		if (key === '_id') {
			continue;
		}

		if (!keyNameRule.test(key)) {
			throw new Error('doc contains a non-valid key');
		}
	}

	const requestBody = JSON.stringify(doc);

	const options = {
		method: 'POST',
		hostname: dbHostname,
		path: `/${dbName}`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Content-Length': requestBody.length,
		},
		auth: `${adminUsername}:${adminPassword}`,
	};

	const response = await request(options, requestBody);

	if (!response.statusCode || !response.body) {
		throw new Error('toil and trouble'); 
	}

	const responseBody = JSON.parse(response.body);

	if (response.statusCode !== 201) {
		const err = new Error(`createDoc failed
			status: ${response.statusCode}
			reason: ${responseBody.reason}`);
		err.response = responseBody;
		err.status = response.statusCode;
		throw err; 
	}

	return responseBody;	
};