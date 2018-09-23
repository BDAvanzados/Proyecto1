var router = require('express').Router();
var bodyParser = require("body-parser");
var TYPES = require('tedious').TYPES;

var ConnectST = require('./access.js').ConnectST;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var admi=3;
var gerente=4;


router.get ("/:site/:usr/:pssw/", function(req, res){
    var site = req.params.site;
    var usr = req.params.usr;
    var pssw = req.params.pssw;
    str = "test_verifyCredentials_3";

    params = [
        {name:'username', type: TYPES.VarChar,value:usr},
        {name:'pass', type: TYPES.VarChar,value:pssw}
    ];

    ConnectST(str, params, site, function(jsonArray){
        if (jsonArray==[] || jsonArray.hasOwnProperty('error'))
        res.send({status:false ,error:'Wrong User of Password'});
    else {
        if (jsonArray[0].rolId==admi || jsonArray[0].rolId==gerente){
            if ((jsonArray[0].sucursalId)==site) 
                res.send(jsonArray[0]);
            else 
                res.send({status:false , error:'Wrong Branch'});
        }else res.send(jsonArray[0]);
    }
    });
});

module.exports = router;
