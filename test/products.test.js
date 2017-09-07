// Simulate express server without localhost up, passing its instance to supertest
// Supertest then integrates with express and dispatch simulated requests
var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');
// var assert = require('assert');

// Integration tests for Products Controller requests - GET list, POST register

// Unit tests: check each code functionalities
// Integration tests: check functionalities in an entire code flow
describe('#ProductsController', function() {

    beforeEach(function(done) {
        var cleaner = new DatabaseCleaner('mysql');
        cleaner.clean(express.infra.connectionFactory(), function() {
            done();
        });

        // Manual DB clean before each test
        // var conn = express.infra.connectionFactory();
        // conn.query("DELETE FROM products", function(err, result) {
        //     if(!err) {
        //         done();
        //     }
        // });
    });

    it('#JSON list', function(done) {

        request.get('/products')
               .set('Accept', 'application/json')
               .expect('Content-type', /json/)
               .expect(200, done);

        // OLD VERSION WITHOUT SUPERTEST - USES HTTP AND ASSERT FROM NODE
        // var req = request.get(options, function(res) {
        //     assert.equal(res.statusCode,200);
        //     assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        //     // End async function with finalize argument function
        //     done();
        // });
    });

    it('#Register new product with invalid data', function(done) {
        request.post('/products')
               .send({title:"",description:"New book"})
               .expect(400,done);
    });

    it('#Register new product with valid data', function(done) {
        request.post('/products')
               .send({title:"Book",description:"New book",price:20.50})
               .expect(302,done);
    });
});