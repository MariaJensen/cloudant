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

* **Parameters:**
  * **dbName string** A non-empty string in which 
    * the first character is a small letter from a to z
    * any other character is 
      * a small letter from a to z 
      * a digit from 0 to 9 
      * any of the special characters \_, \$, \(, \), +, -, \/ 

* **Returns**

### deleteDb(dbName) <!-- -------------------------------------- -->

* **Parameters:**

* **Returns**

### createDoc(dbName, doc) <!-- -------------------------------------- -->

* **Parameters:**

* **Returns**

### readDoc(dbName, docId [, queryParameters]) <!-- --------------------------- -->

* **Parameters:**

* **Returns**

### updateDoc(dbName, doc) <!-- -------------------------------------- -->

* **Parameters:**

* **Returns**

### deleteDoc(dbName, docId, docRev) <!-- ------------------------------------ -->

* **Parameters:**

* **Returns**