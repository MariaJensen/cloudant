'use strict'; 

const assert = require('assert');
const Cloudant = require('../cloudant');

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

describe('DATABASE METHODS', function() {

	describe('\n    createDb\n', function() {

		beforeEach(async function() {
			await cloudant.deleteDb('test-db');
		});

		afterEach(async function() {
			await cloudant.deleteDb('test-db');
		});
		
		it(`returns
		\{ error: 'request_not_send',
		  reason: 'Illegal database name.'
		  status: 0 \}
	if the dbName does not start with a small letter a-z`, async function() {
		  	const createDb = await cloudant.createDb('Test');
		  	assert.equal(createDb.error, 'request_not_send');
		  	assert.equal(createDb.reason, 'Illegal database name.');
		  	assert.equal(createDb.status, 0);
		});

		it(`returns
		\{ error: 'request_not_send',
		  reason: 'Illegal database name.'
		  status: 0 \}
	if the dbName contains a character which is not 
	      	- a small letter a-z
	        - a digit 0-9
	        - one of the characters: _ \$ ( ) + - `, async function() {
		  	const createDb = await cloudant.createDb('testDb');
		  	assert.equal(createDb.error, 'request_not_send');
		  	assert.equal(createDb.reason, 'Illegal database name.');
		  	assert.equal(createDb.status, 0);
		});

		it(`returns 
		\{ error: 'file_exists',
		  reason: 'The database could not be created, the file already exists.',
		  status: 412 \}
	if db already exists`, async function() {
		  	await cloudant.createDb('test-db');
		  	const createDb2 = await cloudant.createDb('test-db');
		  	assert.equal(typeof createDb2, 'object'),
		  	assert.equal(createDb2.error, 'file_exists');
		  	assert.equal(createDb2.reason, 'The database could not be created, the file already exists.');
		  	assert.equal(createDb2.status, 412);
		  });

		it(`returns 
		\{ ok: true, 
		  status: 201 \}	
	if db is created successfully`, async function() {
			const createDb = await cloudant.createDb('test-db'); 
			assert.equal(typeof createDb, 'object');
			assert.equal(createDb.ok, true);
			assert.equal(createDb.status, 201);
		});
	});


	describe('\n    deleteDb\n', function() {

		beforeEach(async function() {
			await cloudant.deleteDb('test-db');
		});

		afterEach(async function() {
			await cloudant.deleteDb('test-db');
		});
		
		it(`returns
		\{ error: 'request_not_send',
		  reason: 'Illegal database name.'
		  status: 0 \}
	if the dbName does not start with a small letter a-z`, async function() {
		  	const deleteDb = await cloudant.deleteDb('Test');
		  	assert.equal(deleteDb.error, 'request_not_send');
		  	assert.equal(deleteDb.reason, 'Illegal database name.');
		  	assert.equal(deleteDb.status, 0);
		});

		it(`returns
		\{ error: 'request_not_send',
		  reason: 'Illegal database name.'
		  status: 0 \}
	if the dbName contains a character which is not 
	      	- a small letter a-z
	        - a digit 0-9
	        - one of the characters: _ \$ ( ) + - `, async function() {
		  	const deleteDb = await cloudant.deleteDb('testDb');
		  	assert.equal(deleteDb.error, 'request_not_send');
		  	assert.equal(deleteDb.reason, 'Illegal database name.');
		  	assert.equal(deleteDb.status, 0);
		});

		it(`returns 
		\{ error: 'not_found',
		  reason: 'Database does not exist.',
		  status: 404 \}
	if db does not exist`, async function() {
			const deleteDb = await cloudant.deleteDb('test-db');
		  	assert.equal(typeof deleteDb, 'object'),
		  	assert.equal(deleteDb.error, 'not_found');
		  	assert.equal(deleteDb.reason, 'Database does not exist.');
		  	assert.equal(deleteDb.status, 404);
		  });

		it(`returns 
		\{ ok: true, 
		  status: 200 \}	
	if db is deleted successfully`, async function() {
			const createDb = await cloudant.createDb('test-db'); 
			const deleteDb = await cloudant.deleteDb('test-db');
			assert.equal(typeof deleteDb, 'object');
			assert.equal(deleteDb.ok, true);
			assert.equal(deleteDb.status, 200);
		});
	});
});