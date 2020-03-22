var express = require("express");
const app = require("https-localhost")()
app.use(express.static('.'));
app.use('style', express.static(__dirname + '/style'));
app.use('script', express.static(__dirname + '/script'));
app.use('resources', express.static(__dirname + '/resources'));
app.listen(443)