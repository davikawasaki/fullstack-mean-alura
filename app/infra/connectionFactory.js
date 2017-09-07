var mysql = require('mysql');

// Factory method
function createDBConnection() {
    // DB for development
    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'root',
            database : 'fullstack_mean'
        });
    }
    // DB for tests
    else if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'root',
            database : 'fullstack_mean_test'
        });
    }
};

// Prototype wrapper
module.exports = function() {
    return createDBConnection;
}

// Since Node.js module loader returns the module after preparing and loading it
// we can use the exports literal object as the way above or other options:

// exports.createDBConnection = createDBConnection();
// require('./connectionFactory').createDBConnection();