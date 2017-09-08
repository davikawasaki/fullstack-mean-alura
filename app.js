// Setting a express proprietary module that sets and starts an express server
var app = require('./config/express')();
// Node.js server requests handler, using express app as its server (composition to socket.io)
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

// Setting port as environment or 3000
var port = process.env.PORT || 3000;

var server = http.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Running server at http://%s:%s', host, port);
});