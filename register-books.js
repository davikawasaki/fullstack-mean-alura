var http = require('http');

var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/products',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var clientHttp = http.request(options, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log("Corpo: " + body);
    });
});

clientHttp.on('error', function(e) {
    console.log("There was an error: " + e.message);
});

var product = {
    title: 'More about Node',
    description: 'Node, javascript and about HTTP',
    price: 100
};

// Gets the requisition and send with the product stringfied in a string
clientHttp.end(JSON.stringify(product));