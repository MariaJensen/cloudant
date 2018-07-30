'use strict'; 

const Cloudant = require('../cloudant');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('cloudant', function() {

	const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

	describe('createDb', function() {
		it('rejects missing dbName', function() {
			return expect(cloudant.createDb()).to.be.rejectedWith(Error);
		});
		it('rejects falsy dbName', function() {
			return expect(cloudant.createDb('')).to.be.rejectedWith(Error);
		}); 
		it('rejects falsy dbName', function() {
			return expect(cloudant.createDb(0)).to.be.rejectedWith(Error);
		});
		it('rejects non-string dbName', function() {
			return expect(cloudant.createDb(1)).to.be.rejectedWith(Error);
		});
		it('rejects capital letters in dbName', function() {
			return expect(cloudant.createDb('bAaa')).to.be.rejectedWith(Error);
		});
		it('rejects outlandish characters in dbName', function() {
			return expect(cloudant.createDb('a#a')).to.be.rejectedWith(Error);
		});
		it('rejects special characters in beginning of dbName', function() {
			return expect(cloudant.createDb('$aa')).to.be.rejectedWith(Error);
		});
		it('rejects numbers in beginning of dbName', function() {
			return expect(cloudant.createDb('1aa')).to.be.rejectedWith(Error);
		});
		it('creates a db', async function() {
			const response = await cloudant.createDb('a');
			expect(response).to.be.instanceof(Object);
		});	
	});
});