var express = require('express');

// Loading automatically all application modules
var load = require('express-load');

module.exports = function() {
    // First load the module and then invokes the object 
    var app = express();

    // Setting HTML view engine as EJS to express
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    return app;
}