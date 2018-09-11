var http = require('http')
var fs = require('fs')
var express = require('express')
var app = express()


app.use(express.static(__dirname + '/'))
app.listen(3005, function() { console.log('Example app listening on port 3005!')})

