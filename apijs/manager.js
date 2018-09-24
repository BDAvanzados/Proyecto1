var router = require('express').Router();
var bodyParser = require("body-parser");
var TYPES = require('tedious').TYPES;

var ConnectDB = require('./access.js').ConnectDB;
var ConnectST = require('./access.js').ConnectST;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Monto recaudado por sucursal en un periodo
router.get ("/total/:site/:type/:startDate/:finishDate/", function(req, res){
    let site = req.params.site;
    let type = req.params.type;
    let startDate = req.params.startDate;
    let finishDate = req.params.finishDate;
    let str = "managerTotals";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
        {name:'tipo', type: TYPES.VarChar,value:type},
        {name:'dateStart',type: TYPES.VarChar,value:startDate}, //2018-09-15
        {name:'dateEnd',type: TYPES.VarChar,value:finishDate} //2018-09-20
    ];

    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});

//Monto recaudado por sucursal por tipo de paquete en un periodo.

//-> igual al enterior, diferentes parametros

//Lista de 3 mejores clientes en un periodo (los de mayor monto de paquetes)
router.get ("/top3/:site/:startDate/:finishDate/", function(req, res){
    let site = req.params.site;
    let startDate = req.params.startDate;
    let finishDate = req.params.finishDate;
    let str = "managerTop3TotalsByTimeRange";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
        {name:'dateStart',type: TYPES.VarChar,value:startDate}, //2018-09-15
        {name:'dateEnd',type: TYPES.VarChar,value:finishDate} //2018-09-20
    ];

    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});

module.exports = router;