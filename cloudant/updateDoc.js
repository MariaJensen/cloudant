'use strict';

const request = require('./request/request.js'); 

module.exports = async (dbHostname, adminUsername, adminPassword, dbName, doc) => {

	// validate dbName: 

	if (!dbName || typeof dbName !== 'string') {
		throw new Error('dbName must be a non-empty string');
	}

	const dbNameRule = /^[a-z](([a-z]|[0-9]|[_$()+-/])*)$/;
		
	if (!dbNameRule.test(dbName)) {
		throw new Error('dbName is not valid');
	}

	// validate doc: 

	if (!doc || typeof doc !== 'object') {
		throw new Error('doc must be an object');
	}

	if (!doc._id || typeof doc._id !== 'string' || !doc._rev || typeof doc._rev !== 'string') {
		throw new Error('doc must have keys _id and _rev and their values must be of type string');
	}

	// Make request: 

	const requestBody = JSON.stringify(doc);

	const options = {
		method: 'PUT',
		hostname: dbHostname, 
		path: `/${dbName}/${doc._id}`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Content-Length': requestBody.length,
		},
		auth: `${adminUsername}:${adminPassword}`,
	}

	const response = await request(options, body);

	if (!response.body || !response.statusCode) {
		throw new Error(`nfg`);
	}

	const responseBody = JSON.parse(response.body);

	if (response.statusCode !== 201) {
		const err = new Error(`updateDoc failed
			status: ${response.statusCode}
			reason: ${responseBody.reason}`);
		err.response = responseBody;
		err.status = response.statusCode;
		throw err; 
	}

	return responseBody; 
};

