
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({credentials: true, origin: true}));



var client = require('./apijs/client.js');
var branch = require('./apijs/branch.js');
var sign = require('./apijs/sign.js');
var admi = require('./apijs/admi.js');
var manager = require('./apijs/manager.js');

app.use('/client', client);
app.use('/branch', branch);
app.use('/sign', sign);
app.use('/admi', admi);
app.use('/manage', manager);


app.use(function(req, res){
  res.send({status:false ,error:'Invalid URL'});
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  