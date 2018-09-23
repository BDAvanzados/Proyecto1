var router = require('express').Router();
var bodyParser = require("body-parser");
var TYPES = require('tedious').TYPES;

var ConnectDB = require('./access.js').ConnectDB;


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



//Obtiene los paquetes de un cliente
router.get ("/mypkgs/:site/:userId", function(req, res){
    let site = req.params.site;
    let userId = req.params.userId;
    let query = "SELECT * from paquete WHERE clientid="+userId;
    
    ConnectDB(query, site, function(jsonArray){
        res.send(jsonArray);
    });
});


//Obtiene los paquetes 
router.get ("/pkgs/:site/", function(req, res){
    let site = req.params.site;
    let query = "SELECT * from paquete WHERE sucursalId =\'"+site+"\'";
    console.log(query);
    ConnectDB(query, site, function(jsonArray){
        res.send(jsonArray);
    });
});


module.exports = router;