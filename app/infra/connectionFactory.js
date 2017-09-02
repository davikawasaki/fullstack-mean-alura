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