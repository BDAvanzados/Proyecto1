
var express = require('express');
var app = express();



var client = require('./apijs/client.js');
//var branch = require('./apijs/branch.js');
//var pkg = require('./apijs/package.js');

app.use('/client', client);
//app.use('/branch', branch);
//app.use('/pkg', pkg);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  