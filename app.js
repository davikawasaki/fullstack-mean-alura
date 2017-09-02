var express = require('express');
var app = express();

// Setting port as environment or 3000
var port = process.env.port || 3000;

// Setting HTML view engine as EJS to express
app.set('view engine', 'ejs');

/**
 * GET: products list rendered by EJS
 */
app.get('/products', function(req, res) {
    res.render("products/list");
});

app.listen(port, function() {
    console.log("Running server on port " + port);
});