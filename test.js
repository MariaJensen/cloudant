'use strict';

const Cloudant = require('./cloudant');

const hostname = process.env.DB_HOSTNAME;
const username = process.env.DB_ADMIN_USERNAME;
const password = process.env.DB_ADMIN_PASSWORD;

const cloudant = new Cloudant(hostname, username, password);

(async () => {

	try {
	
		const createDb = await cloudant.createDb('test');
		console.log('createDb: ', createDb); 

		// const createDb2 = await cloudant.createDb('test');
		// console.log('createDb2: ', createDb2);

		const createDoc = await cloudant.createDoc('test', {
			fact: 'Jeremiah was a bullfrog',
		});
		console.log('createDoc: ', createDoc);

		// const createDoc2 = await cloudant.createDoc('test2', {
		// 	fact: 'Jeremiah was a bullfrog',
		// });
		// console.log('createDoc2: ', createDoc2);

		const readDoc = await cloudant.readDoc('test', createDoc.id);
		console.log('readDoc: ', readDoc);

		const readDoc2 = await cloudant.readDoc('test', 'test');
		console.log('readDoc2: ', readDoc2);

		// const deleteDoc = await cloudant.deleteDoc('test', createDoc.id, createDoc.rev);
		// console.log('deleteDoc: ', deleteDoc);

		const deleteDb = await cloudant.deleteDb('test');
		console.log('deleteDb: ', deleteDb);

		// const deleteDb2 = await cloudant.deleteDb('test');
		// console.log('deleteDb2: ', deleteDb2);

	} catch(err) {
		console.log(err);
		await cloudant.deleteDb('test');
	}


})();