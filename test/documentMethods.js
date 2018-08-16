'use strict'; 

const assert = require('assert');
const Cloudant = require('../cloudant');

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

describe('DOCUMENT METHODS', function() {

	beforeEach(async function() {
		await cloudant.createDb('test');
		console.log('beforeEach');
	})

	afterEach(async function() {
		await cloudant.deleteDb('test');
		console.log('afterEach');
	})

	describe('\n    createDoc\n', function() {
		it(`returns 
		  \{ ok: true,
		  status: 201,
		  id: <string>,
		  rev: <string> \}
	if doc is created successfully`, async function() {
			const createDoc = await cloudant.createDoc('test', {
				jeremiah: 'bullfrog',
			});
			assert.equal(typeof createDoc, 'object');
			assert.equal(typeof createDoc.id, 'string');
			assert.equal(typeof createDoc.rev, 'string');
			assert.equal(createDoc.status, 201);
			assert.equal(createDoc.ok, true);
		});
	});

		it(`returns 
			  \{ ok: true,
			  status: 201,
			  id: <string>,
			  rev: <string> \}
		if doc is created successfully`, async function() {
			const createDoc = await cloudant.createDoc('test', {
				jeremiah: 'bullfrog',
			});
			assert.equal(typeof createDoc, 'object');
			assert.equal(typeof createDoc.id, 'string');
			assert.equal(typeof createDoc.rev, 'string');
			assert.equal(createDoc.status, 201);
			assert.equal(createDoc.ok, true);
		});
});