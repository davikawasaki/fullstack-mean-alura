var http = require('http');

var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/products',
    headers: {
        'Accept': 'application/json'
    }
};

var req = http.get(options, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log("Corpo: " + body);
    });
});

req.on('error', function(e) {
    console.log("There was an error: " + e.message);
});