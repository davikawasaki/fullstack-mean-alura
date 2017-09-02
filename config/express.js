var app = require('express')();

// Setting HTML view engine as EJS to express
app.set('view engine', 'ejs');
app.set('views', './app/views');

module.exports = function() {    
    return app;
}