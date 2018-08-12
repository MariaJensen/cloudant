# Cloudant

Methods for managing a cloudant database from Node.js. 

## Prerequisites
An account on [IBM Cloudant](https://www.ibm.com/cloud/cloudant).

Let `<hostname>` be the hostname of the database address. It has the form 
```
    random-letters-and-numbers-bluemix.cloudant.com
```
Let `<username>` and `<password>` be the credentials of a user on the database. 

## Installing
Place the cloudant directory in your project directory and import the Cloudant class to a node/javascript file in the usual way: 
```javascript
const Cloudant = require('./cloudant');
```
(where obviously the string should reflect the actual location of the cloudant directory). 

Now you can create a cloudant object for your database: 
```javascript
const cloudant = new Cloudant('<hostname>', '<username>', '<password>');
```
## Example
The object has methods for doing database operations in an asynchroneous environment: 
```javascript
// TODO
```
## Methods
The cloudant module exports a class with the following methods: 

### createDb(dbName) 
Creates a database with name dbName, provided that such a database does not already exist. 

###### **Parameters:**
  * **dbName string** A non-empty string in which 
    * the first character is a small letter a-z
    * any other character is either
      * a small letter a-z, or 
      * a digit 0-9, or 
      * any of the special characters \_ \$ \( \) + - \/ 

###### **Returns**
  * **object** 
    * If the database is created successfully, the returned object will have the properties
      * ok: true
      * status: 201

    * else the returned object will have the properties
      * error: `<string>`
      * reason: `<string>`
      * status: `<number>`

### deleteDb(dbName) 
Deletes the database with name dbName, provided that such a database exists. 

###### **Parameters:**
  * **dbName string** The name of an existing database

###### **Returns**
  * **object** 
    * If the database is successfully deleted, the returned object will have the properties
      * ok: true
      * status: 200

    * else the returned object will have the properties
      * error: `<string>`
      * reason: `<string>`
      * status: `<number>`

### createDoc(dbName, doc) 
Creates the document in the database named dbName, provided that such a database exists. 

If doc has an \_id property, this will be the id of the document, provided that no document with this id exists already. 

If doc has no \_id property, a random id will be generated for the document. 

###### **Parameters:**
  * **dbName string** The name of an existing database
  * **doc object** 

###### **Returns**
  * **object** 
    * If the document is successfully created, the returned object will have the properties
      * ok: true
      * status: 201
      * id: `<string>`
      * rev: `<string>`

    * else the returned object will have the properties
      * error: `<string>`
      * reason: `<string>`
      * status: `<number>`

### readDoc(dbName, docId [, queryParameters]) 
Retrieves the content of the document with id docId in the database with name dbName, provided that such a database and document exist. 

###### **Parameters:**
* **dbName string**
* **docId string**
* **queryParameters object**

###### **Returns**
* **object**
  * If the document is successfully retrieved, the returned object will have the properties
    * ok: true
    * status: 200
    * id: `<string>`
    * rev: `<string>`
    * doc: `<object>`
  
  * else the returned object will have the properties 
    * error: `<string>`
    * reason: `<string>`
    * status: `<number>`

### updateDoc(dbName, doc) 
Overwrites the document with id doc._id and revision doc._rev in database dbName with doc. Provided that all these exist. 

Note: If 
	{ error: 'conflict',
	  reason: 'Document update conflict.'
	  status: 409 }
is returned, it means that either
* A document with id \_id exists in the database dbName, but the provided \_rev is not the lates revision of it

OR that
* No document with id \_id exists in the database dbName.  

###### **Parameters:**
* **dbName string**
* **doc object** Must have properties _id and _rev

###### **Returns**
* **object**
  * if the document is successfully updated, the returned object will have the properties
    * ok: true
    * status: 201
    * id: ´<string>´
    * rev: ´<string>´
  
  * elsethe returned object will have properties
    * error: `<string>`
    * reason: `<string>`
    * status: `<number>`   

### deleteDoc(dbName, docId, docRev) 
Deletes the document with id docId and latest revision docRev from the database dbName, provided that such exist. 

###### **Parameters:**
* **dbName string**
* **docId string**
* **docRev string**

###### **Returns**
* **object**
  * If the document is successfully deleted, the returned object will have the properties
    * ok: true
    * status: 200
    * id: `<string>`
    * rev: `<string>`
  
  * else the returned object will have the properties
    * error: `<string>`
    * reason: `<string>`
    * status: `<number>`