var router = require('express').Router();
var bodyParser = require("body-parser");

var ConnectDB = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var admi=3;
var gerente=4;


router.get ("/:site/:usr/:pssw/", function(req, res){
    let site = req.params.site;
    let usr = req.params.usr;
    let pssw = req.params.pssw;
    let query = "SELECT * FROM usuario";

    ConnectDB(query, site, function(jsonArray){
        if (jsonArray==[] || jsonArray.hasOwnProperty('error'))res.send({status:false ,error:'Wrong User of Password'});
        else {
            if (jsonArray[0].rolId==admi || jsonArray[0].rolId==gerente){
                if (jsonArray[0].sucursalID==site) res.send(jsonArray);
                else res.send({status:false , error:'Wrong Branch'});
            }else res.send(jsonArray);
        }
    });
});

module.exports = router;
