# Cloudant

Methods for managing a cloudant database from Node.js using promises. 

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
