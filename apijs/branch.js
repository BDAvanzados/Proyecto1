var router = require('express').Router();
var bodyParser = require("body-parser");
var TYPES = require('tedious').TYPES;


var ConnectDB = require('./access.js').ConnectDB;
var ConnectST = require('./access.js').ConnectST;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Obtiene la informacion de la sucursal en el sitio
router.get ("/suc/:site", function(req, res){
    let site = req.params.site
    let query = "SELECT * from sucursal WHERE id =\'"+site+"\'";
    console.log(query);
    ConnectDB(query, site, function(jsonArray){
        res.send(jsonArray);
    });
});


//registrar un paquete
router.post('/addpkg', function(req, res) {
    var clientId = req.clientId;
    var sucursalId = req.sucursalId;
    var pkgs = req.pkgs;

});

  module.exports = router;

  