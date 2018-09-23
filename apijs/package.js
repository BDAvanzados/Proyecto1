var router = require('express').Router();
var bodyParser = require("body-parser");

var ConnectDB = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get ("/pkg/:usr/:pssw/", function(req, res){
    let usr = req.params.usr;
    let pssw = req.params.pssw;
    query = "SELECT * FROM usuario WHERE usuario.nombre=" + usr+ "AND usuario.cedula=" + pssw;

    ConnectDB(query, "HE", function(jsonArray){
        
        if (jsonArray[0]={})

        res.send(jsonArray);
    });
});