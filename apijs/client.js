var router = require('express').Router();
var bodyParser = require("body-parser");


var ConnectDB = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//obtiene el monto promedio por cliente en un rago de fechas
router.get('/:site/average/:initialDate/:endDate', function (req, res) {
    site = req.params.site;
    initialDate = req.params.initialDate;
    endDate = req.params.endDate;
    query = "SELECT distinct(CLIENTE.cedula), CLIENTE.nombre, AVG(PAQUETE.valor + PAQUETE.monto_servicio) " +
            "FROM CLIENTE, PAQUETE, SUCURSAL " +
            "WHERE PAQUETE.sucurcal_id = SUCURSAL.id and PAQUETE.fecha_recepcion > " + initialDate+ " and PAQUETE.fecha_recepcion < "+endDate+
            " GROUP BY CLIENTE.cedula, CLIENTE.nombre";
    console.log(query)
    ConnectDB(query,site,function(jsonArray){            
        res.send(jsonArray);
    });
  });

//obtiene los paquetes por cliente en un rango de fechas
router.get('/:site/package/:initialDate/:endDate', function(req, res){
    site = req.params.site;
    initialDate = req.params.initialDate;
    endDate = req.params.endDate;
    query = "SELECT distinct(CLIENTE.cedula), CLIENTE.nombre, PAQUETE.categoria, PAQUETE.tipo, PAQUETE.descripcion "+
    "FROM CLIENTE, PAQUETE, SUCURSAL " +
    "WHERE PAQUETE.sucurcal_id = SUCURSAL.id and PAQUETE.fecha_recepcion > " + initialDate+ " and PAQUETE.fecha_recepcion < "+endDate+
    " GROUP BY CLIENTE.cedula, CLIENTE.nombre, PAQUETE.tipo, PAQUETE.categoria, PAQUETE.descripcion";
    ConnectDB(query,site,function(jsonArray){            
        res.send(jsonArray);
    });
  });

//obtiene los top 3 clientes en un rango de fechas
router.get('/:site/top/:initialDate/:endDate', function(req, res){
    initialDate = req.params.initialDate;
    endDate = req.params.endDate;
    site = req.params.site;
    query = "SELECT distinct top 3(CLIENTE.cedula), CLIENTE.nombre, AVG(PAQUETE.valor + PAQUETE.monto_servicio) "+
    "FROM CLIENTE, PAQUETE, SUCURSAL "+
    "WHERE PAQUETE.sucurcal_id = SUCURSAL.id and PAQUETE.fecha_recepcion > " + initialDate+ " and PAQUETE.fecha_recepcion < "+endDate+
    " GROUP BY CLIENTE.cedula, CLIENTE.nombre" +
    " ORDER BY AVG(PAQUETE.valor + PAQUETE.monto_servicio)";
    ConnectDB(query,site,function(jsonArray){            
        res.send(jsonArray);
    });
  });


  module.exports = router;


    