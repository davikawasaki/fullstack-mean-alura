var express = require('express');

// Loading automatically all application modules
var load = require('express-load');

// Fill request body with parser
var bodyParser = require('body-parser');

// Validate JSON fields from requests
var expressValidator = require('express-validator');

module.exports = function() {
    // First load the module and then invokes the object 
    var app = express();

    // Middleware to serve static data from within a directory
    app.use(express.static('./app/public'));

    // Setting HTML view engine as EJS to express
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    // Parser middleware to load before routes
    // The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded
    // Uses the qs library instead of querystring one
    // Example: nested object can be posted with qs library
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    // Changing default directory to app with cwd
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    return app;
}