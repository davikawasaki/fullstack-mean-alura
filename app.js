// Setting a express proprietary module that sets and starts an express server
var app = require('./config/express')();

// Setting port as environment or 3000
var port = process.env.port || 3000;

// Importing Routes Modules
var productsRoutes = require('./app/routes/products')(app);

app.listen(port, function() {
    console.log("Running server on port " + port);
});