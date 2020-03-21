var express = require("express");

var app = express();

app.use(express.static('.'));

app.use('style', express.static(__dirname + '/style'));
app.use('script', express.static(__dirname + '/script'));
app.use('resources', express.static(__dirname + '/resources'));

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});