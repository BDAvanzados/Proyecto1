var router = require('express').Router();
var bodyParser = require("body-parser");


var ConnectDB = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('/', function (req, res) {

    ConnectDB("select * from test","CA",function(jsonArray){            
        res.send(jsonArray);
    });
  });

  module.exports = router;

  