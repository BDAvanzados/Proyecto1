var router = require('express').Router();
var TYPES = require('tedious').TYPES;
var bodyParser = require("body-parser");

var ConnectDB = require('./access.js');
var ConnectST = require('./access.js');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());




module.exports = router;