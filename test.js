'use strict';

const Cloudant = require('./cloudant');

const hostname = process.env.DB_HOSTNAME;
const username = process.env.DB_ADMIN_USERNAME;
const password = process.env.DB_ADMIN_PASSWORD;

const cloudant = new Cloudant(hostname, username, password);

(async () => {
	
	await cloudant.createDb('my-new-db');

	const doc1 = {
		_id: 'myDocId',
		message: 'Hello database',
	};

	await cloudant.createDoc('my-new-db', doc1); 

	const readDoc1 = await cloudant.readDoc('my-new-db', 'myDocId');

	console.log(readDoc1);

	const doc2 = {
		_id: 'myDocId',
		_rev: readDoc1._rev,
		message: 'Goodbye database',
	};

	await cloudant.updateDoc('my-new-db', doc2);

	const readDoc2 = await cloudant.readDoc('my-new-db', 'myDocId');

	console.log(readDoc2);

	await cloudant.deleteDoc('my-new-db', readDoc2._id, readDoc2._rev);

	await cloudant.deleteDb('my-new-db');

})();


