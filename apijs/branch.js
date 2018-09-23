var router = require('express').Router();
var bodyParser = require("body-parser");


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

//obtiene el total recaudado por una sucursal
router.get('/total/:site', function (req, res) {
    let site = req.params.site
    let query = "SELECT valor, monto_servicio FROM PAQUETE, SUCURSAL WHERE SUCURSAL.id = PAQUETE.sucursalId and PAQUETE.retirado = 1";
    let suma = 0;
    ConnectDB(query,site,function(jsonArray){            
        jsonArray.forEach(element => {
            suma += element["valor"] + element["monto_servicio"];
        });
        res.send({total:suma});
    });
});

//obtiene el total recaudado por una sucursal en cierto rango de fechas
router.get('/:site/total/:initialDate/:endDate', function (req, res) {
    var site = req.params.site; 
    var initialDate = req.params.initialDate;
    var endDate = req.params.endDate;
    query = "SELECT valor, monto_servicio FROM PAQUETE, SUCURSAL WHERE SUCURSAL.id = PAQUETE.sucurcal_id and PAQUETE.retirado = 1 and PAQUETE.fecha_recepcion > "+ initialDate + "and PAQUETE.fecha_recepcion < "+endDate;
    var tsuma = 0;
    ConnectDB(query,site,function(jsonArray){            
        jsonArray.forEach(element => {
            suma += element["valor"] + element["monto_servicio"];
        });
        res.send({total:suma});
    });
  });

//obtiene el total recaudado por una sucursal en cierto rango de fechas de un tipo de paquete
router.get('/:site/total/:initialDate/:endDate/:type', function (req, res) {
    var site = req.params.site; 
    var initialDate = req.params.initialDate;
    var endDate = req.params.endDate;
    var type = req.params.type;
    query = "SELECT valor, monto_servicio, tipo FROM PAQUETE, SUCURSAL WHERE SUCURSAL.id = PAQUETE.sucurcal_id and PAQUETE.retirado = 1 and PAQUETE.fecha_recepcion > "+ initialDate + " and PAQUETE.fecha_recepcion < "+endDate + " and PAQUETE.tipo = '" + type + "'";
    var suma = 0;
    ConnectDB(query,site,function(jsonArray){            
        jsonArray.forEach(element => {
            suma += element["valor"] + element["monto_servicio"];
        });
        res.send({total:suma});
    });
  });

  module.exports = router;

  