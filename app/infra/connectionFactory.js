var mysql = require('mysql');

// Factory method
function createDBConnection() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'fullstack_mean'
    });
};

// Prototype wrapper
module.exports = function() {
    return createDBConnection;
}

// Since Node.js module loader returns the module after preparing and loading it
// we can use the exports literal object as the way above or other options:

// exports.createDBConnection = createDBConnection();
// require('./connectionFactory').createDBConnection();