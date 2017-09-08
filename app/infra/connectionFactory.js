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
    // DB for production (heroku)
    else if(process.env.NODE_ENV == 'production') {
        var connectionUrl = process.env.CLEARDB_DATABASE_URL;
        var connGroups = connectionUrl.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        console.log("Host: " + connGroups[3]);
        console.log("User: " + connGroups[1]);
        console.log("Pass: " + connGroups[2]);
        console.log("Database: " + connGroups[4]);
        return mysql.createConnection({
            host : connGroups[3],
            user : connGroups[1],
            password : connGroups[2],
            database : connGroups[4]
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