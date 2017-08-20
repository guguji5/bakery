var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var key = require('./key.json')
console.log(key)
var url = 'mongodb://'+key.dbuser+':'+key.dbpwd+'@localhost:27017/bakery';

module.exports = {
    MongoClient,
    assert,
    url
};