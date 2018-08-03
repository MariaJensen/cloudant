'use strict'; 

const Cloudant = require('../cloudant');

const dbHostname = process.env.DB_HOSTNAME;
const adminUsername = process.env.DB_ADMIN_USERNAME;
const adminPassword = process.env.DB_ADMIN_PASSWORD;

const cloudant = new Cloudant(dbHostname, adminUsername, adminPassword);

(async () => {

	try {
		
	

		console.log('resolved: ');
		console.log(test);

	} catch(err) {
		console.log('rejected: ');
		console.log(err.response.body);
	}

})();