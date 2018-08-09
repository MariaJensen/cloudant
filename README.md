# Cloudant

Methods for managing a cloudant database from Node.js. 

## Getting started

### Prerequisites
An account on [IBMCloudant](https://www.ibm.com/cloud/cloudant).
Let `<hostname>` be the hostname of the database address. It has the form 
```
    random-letters-and-numbers-bluemix.cloudant.com
```
Let `<username>` and `<password>` be the credentials of a user on the database. 
### Installing
Place the cloudant directory in your project directory and import the Cloudant class to a javascript file in the usual way: 
```javascript
const Cloudant = require('./cloudant');
```
(where obviously the string should reflect the actual location of the cloudant directory). 

Now you can create a cloudant object for your database: 
```javascript
const cloudant = new Cloudant('<hostname>', '<username>', '<password>');
```
The object has methods for doing database operations in an asynchroneous environment: 
```javascript
(async () => {
	
	await cloudant.createDb('my-new-db');

	const doc1 = {
		_id: 'myDocId',
		message: 'Hello database',
	};

	await cloudant.createDoc('my-new-db', doc1); 

	const readDoc1 = await cloudant.readDoc('my-new-db', 'myDocId');

	console.log(readDoc1);
	
		// { _id: 'myDocId',
    		//   _rev: '1-9aeec4b6bd5b7b7fa0ec50bbce565459',
    		//   message: 'Hello database' }
	
	const doc2 = {
		_id: 'myDocId',
		_rev: readDoc1._rev,
		message: 'Goodbye database',
	};

	await cloudant.updateDoc('my-new-db', doc2);

	const readDoc2 = await cloudant.readDoc('my-new-db', 'myDocId');

	console.log(readDoc2);
	
		// { _id: 'myDocId',
    		//   _rev: '2-812f184dbcb8a6c14cc825120c3d2654',
    		//   message: 'Goodbye database' }

	await cloudant.deleteDoc('my-new-db', 'myDocId', readDoc2._rev);

	await cloudant.deleteDb('my-new-db');

})();
