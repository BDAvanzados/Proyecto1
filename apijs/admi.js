var router = require('express').Router();
var bodyParser = require("body-parser");
var TYPES = require('tedious').TYPES;

var ConnectDB = require('./access.js').ConnectDB;
var ConnectST = require('./access.js').ConnectST;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//Cantidad de dinero recaudado en sucursal
router.get ('/total/:site', function(req, res){
    let site = req.params.site;
    let str = "admTotals";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
    ];
    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});


//Lista de paquetes por cliente en un rango de fechas
router.get ("/clientsmypkgs/:site/:clientId/:startDate/:finishDate/", function(req, res){
    let site = req.params.site;
    let startDate = req.params.startDate;
    let finishDate = req.params.finishDate;
    let clientId = req.params.clientId;
    let str = "packagesOfClient";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
        {name: 'clientid',type: TYPES.Int,value: clientId},
        {name:'dateStart',type: TYPES.VarChar,value:startDate}, //2018-09-15
        {name:'dateEnd',type: TYPES.VarChar,value:finishDate} //2018-09-20
    ];

    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});

//Monto promedio pagado por paquete cliente en un rango de fechas.
router.get ("/averageperclient/:site/:startDate/:finishDate/", function(req, res){
    let site = req.params.site;
    let startDate = req.params.startDate;
    let finishDate = req.params.finishDate;
    let clientId = req.params.clientId;
    let str = "clientPackagesAverage";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
        {name:'dateStart',type: TYPES.VarChar,value:startDate}, //2018-09-15
        {name:'dateEnd',type: TYPES.VarChar,value:finishDate} //2018-09-20
    ];

    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});



//Total de monto de un tipo de paquete en un mes

router.get ("/totalpermonth/:site/:type/:month/", function(req, res){
    let site = req.params.site;
    let type = req.params.type;
    let month = req.params.month;
    let str = "admTotalsByPackageAndMonth";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
        {name:'tipo',type: TYPES.VarChar,value:type},
        {name:'month',type: TYPES.Int,value:month} 
    ];

    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});


//registrar entrada de paquetes
router.get('/addpkg/:sucursalId/:clientId/:pkgs/:date', function(req, res) {
    let clientId = req.params.clientId;
    let sucursalId = req.params.sucursalId;
    let pkgs = req.params.pkgs;
    let date =req.params.date;
    let str = "pr_insertarPaqueteCliente";
    pkgs.forEach(pkg => {
        params = [
            {name:'paqueteId', type: TYPES.VarChar,value:pkg},
            {name:'sucursalId',type: TYPES.VarChar,value:site}, //2018-09-15
            {name:'clientId',type: TYPES.VarChar,value:clientId},
            {name:'FechaSolicitud',type: TYPES.VarChar,value:date}
        ];
        if(sucursalId=="HE") {
            ConnectST(str, params, sucursalId, function(jsonArray){
                res.send(jsonArray);
            });
        }else {
            ConnectST(str, params, "HE", function(jsonArray){
                ConnectST(str, params, sucursalId, function(jsonArray){
                    res.send(jsonArray);
            });
            });
        }
    });
});

//registrar salida de paquetes
router.get('/updatepkg/:sucursalId/:clientId/:pkg/:date', function(req, res) {
    let clientId = req.params.clientId;
    let sucursalId = req.params.sucursalId;
    let pkg = req.params.pkg;
    let date =req.params.date;
    let str = "pr_retirarPaquete";
    params = [
        {name:'paqueteId', type: TYPES.VarChar,value:pkg},
        {name:'sucursalId',type: TYPES.VarChar,value:sucursalId}, //2018-09-15
        {name:'clientId',type: TYPES.VarChar,value:clientId},
        {name:'fecharecepcion',type: TYPES.VarChar,value:date}
    ];
    if(sucursalId=="HE") {
        ConnectST(str, params, sucursalId, function(jsonArray){
        });
    }else {
        ConnectST(str, params, "HE", function(jsonArray){
        });
        ConnectST(str, params, sucursalId, function(jsonArray){
            res.send(jsonArray);
    });
    }
});


//////////////////////////////////////////////////////////////
//optine los clinetes y su cantidad de paqueetes en rango fechas 
router.get ("/clientspkg/:site/:startDate/:finishDate/", function(req, res){
    let site = req.params.site;
    let startDate = req.params.startDate;
    let finishDate = req.params.finishDate;
    let str = "clientPackages";
    params = [
        {name:'sucursal', type: TYPES.VarChar,value:site},
        {name:'dateStart',type: TYPES.VarChar,value:startDate}, //2018-09-15
        {name:'dateEnd',type: TYPES.VarChar,value:finishDate} //2018-09-20
    ];

    ConnectST(str, params, site, function(jsonArray){
        res.send(jsonArray);
    });
});

//Obtiene todos los paquetes 
router.get ("/pkgs/:site/", function(req, res){
    let site = req.params.site;
    let query = "SELECT * from paquete WHERE sucursalId =\'"+site+"\'";
    ConnectDB(query, site, function(jsonArray){
        res.send(jsonArray);
    });
});


module.exports = router;