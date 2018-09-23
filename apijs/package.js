var router = require('express').Router();
var TYPES = require('tedious').TYPES;
var bodyParser = require("body-parser");

var ConnectDB = require('./access.js');
var ConnectST = require('./access.js');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get ("/:usr/:pssw/", function(req, res){
    let usr = req.params.usr;
    let pssw = req.params.pssw;
    str = "test_verifyCredentials_3";

    params = [
        {name:'username', type: TYPES.VarChar,value:usr},
        {name:'pass', type: TYPES.VarChar,value:pssw}
    ];
    
    ConnectST(str, params, "HE", function(jsonArray){
        res.send(jsonArray);
    });
});

module.exports = router;