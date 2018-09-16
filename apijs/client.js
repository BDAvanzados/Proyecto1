var router = require('express').Router();
var bodyParser = require("body-parser");
var Request = require('tedious').Request;

//var SanJose = require('./access.js');
var Cartago = require('./access.js');
//var Heredia = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


Cartago.on('connect', function(err){
    if (err) console.log(err)     
});

router.get('/', function (req, res) {
    
    request = new Request(
        "select * from test",
           function(err, rowCount, rows){
                  jsonArray = []
                  rows.forEach(function (columns) {
                      var rowObject ={};
                      columns.forEach(function(column) {
                          rowObject[column.metadata.colName] = column.value;
                      });
                      jsonArray.push(rowObject)
                  });
                  res.send(jsonArray);
                  process.exit();
          }
          );
    Cartago.execSql(request);
  });

  module.exports = router;