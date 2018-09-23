var router = require('express').Router();
var bodyParser = require("body-parser");


var ConnectDB = require('./access.js').ConnectDB;
var ConnectST = require('./access.js').ConnectST;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//Clientes: consultar paquetes
router.get ("/mypkgs/:userId", function(req, res){
    let site = req.params.site;
    let userId = req.params.userId;
    let query = "SELECT * from paquete WHERE clientid="+userId;
    ConnectDB(query,"HE", function(jsonArray){
        res.send(jsonArray);
    });
});
//ver paquertes disponible
// -> pura web
//agregar  paquetes



  module.exports = router;


    