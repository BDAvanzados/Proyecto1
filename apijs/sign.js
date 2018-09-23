var router = require('express').Router();
var bodyParser = require("body-parser");

var ConnectDB = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var admi=3;
var gerente=4;

function addquotes(param){
    return "\'" + param + "\'";
}


router.get ("/:site/:usr/:pssw/", function(req, res){
    let site = req.params.site;
    let usr = req.params.usr;
    let pssw = req.params.pssw;
    let tb_name = 'usuario_test';
    let select_from = "SELECT * FROM " + tb_name + " ";
    let query = select_from + " WHERE " +tb_name+ ".nombre = "+addquotes(usr)+" AND "+tb_name+".cedula="+addquotes(pssw)+";";

    ConnectDB(query, site, function(jsonArray){
        console.log('retrieved');
        console.log(jsonArray);
        if (jsonArray==[] || jsonArray.hasOwnProperty('error'))
            res.send({status:false ,error:'Wrong User of Password'});
        else {
            if (jsonArray[0].rolId==admi || jsonArray[0].rolId==gerente){
                console.log('there is an user');
                if (jsonArray[0].sucursalID==site) 
                    res.send(jsonArray);
                else 
                    res.send({status:false , error:'Wrong Branch'});
            }else res.send(jsonArray);
        }
    });
});

module.exports = router;
