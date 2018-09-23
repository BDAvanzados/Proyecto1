var router = require('express').Router();
var bodyParser = require("body-parser");
var TYPES = require('tedious').TYPES;

var ConnectST = require('./access.js').ConnectST;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var admi=2;
var gerente=3;


router.get("/:site/:usr/:pssw/", function (req, res) {
    var site = req.params.site;
    var usr = req.params.usr;
    var pssw = req.params.pssw;
    let str = "verifyCredentials";

    params = [
        { name: 'username', type: TYPES.VarChar, value: usr },
        { name: 'pass', type: TYPES.VarChar, value: pssw }
    ];

    ConnectST(str, params, site, function (jsonArray) {
        if (jsonArray == [] || jsonArray.hasOwnProperty('error'))
            res.send({ status: false, error: 'Wrong User of Password',err:1 });
        else {
            if (jsonArray[0] != null && jsonArray[0].hasOwnProperty('rolId')) {
                if (jsonArray[0].rolId == admi || jsonArray[0].rolId == gerente) {
                    if ((jsonArray[0].sucursalId) == site) res.send(jsonArray[0]);
                    else res.send({ status: false, error: 'Wrong Branch', err:2});
                } 
                else res.send(jsonArray[0]);
            } 
            else res.send({ status: false, error: 'Wrong Answer',err:3  })
        }
    });
});

module.exports = router;
