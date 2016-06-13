var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// Serve static files
app.use(express.static(__dirname + '/dist'));

// Serve your app
console.log('Served: http://localhost:' + port);
app.listen(port);