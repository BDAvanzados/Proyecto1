var router = require('express').Router();
var bodyParser = require("body-parser");


var ConnectDB = require('./access.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Obtiene la informacion de la sucursal en el sitio
router.get ("/suc/:site", function(req, res){
    var site = req.params.site
    query = "select * from SUCURSAL"
    //
    ConnectDB(query, site, function(jsonArray){
        res.send(jsonArray);
    });
});

// METODO PARA AGREGAR COSAS A LA BASE PARA PRUEBAS
/*
router.get ("/:site", function (req, res){
    var site = req.params.site;
    //query = "UPDATE PAQUETE SET fecha_recepcion = '20171010' WHERE fecha_recepcion = '10102017'";
    query = "SELECT * FROM PAQUETE"
    //query = "INSERT INTO CLIENTE (nombre, apellidos, cedula , num_cuenta, telefono, tipo, provincia_residencia) VALUES ('mario', 'rodriguez', '206710433', '0123456789', '89799749', 'REGULAR', 'San jose')";
    //query = "INSERT INTO SUCURSAL (nombre, detalle, informacion_administrador, telefono, correo, direccion, horario, lugar) VALUES ('Sucursal San Jose', 'Oficinas san jose', 'no se', 12345687, 'sucursal@chepe.com', 'sj', '9am a 3 md', 'san jose')";
    //query = "INSERT INTO PAQUETE (fecha_recepcion, categoria, tipo, descripcion, peso, valor, monto_servicio, retirado,cliente_id, sucurcal_id) VALUES ('11102016', 'nosexdx2', 'electro', 'que xd', 30, 55000, 10000, 1, 2, 6)";
    ConnectDB(query, site, function(jsonArray){
        res.send(jsonArray);
    });
})
*/


//obtiene el total recaudado por una sucursal
router.get('/:site/total', function (req, res) {
    let site = req.params.site
    let query= "SELECT distinct(SUCURSAL.nombre), SUM(PAQUETE.valor + PAQUETE.monto_servicio) FROM PAQUETE, SUCURSAL WHERE SUCURSAL.id ="+ " SUCURSAL.id =  PAQUETE.sucurcal_id and PAQUETE.retirado = 1 GROUP BY SUCURSAL.nombr e";
    ConnectDB(query,site,function(jsonArray){            
        jsonArray.forEach(element => {
            total += element["valor"] + element["monto_servicio"];
        });
        res.send({total});
    });
  });

//obtiene el total recaudado por una sucursal en cierto rango de fechas
router.get('/:site/total/:initialDate/:endDate', function (req, res) {
    var site = req.params.site; 
    var initialDate = req.params.initialDate;
    var endDate = req.params.endDate;
    query = "SELECT valor, monto_servicio FROM PAQUETE, SUCURSAL WHERE SUCURSAL.id = PAQUETE.sucurcal_id and PAQUETE.retirado = 1 and PAQUETE.fecha_recepcion > "+ initialDate + "and PAQUETE.fecha_recepcion < "+endDate;
    var total = 0;
    ConnectDB(query,site,function(jsonArray){            
        jsonArray.forEach(element => {
            total += element["valor"] + element["monto_servicio"];
        });
        res.send({total});
    });
  });

//obtiene el total recaudado por una sucursal en cierto rango de fechas de un tipo de paquete
router.get('/:site/total/:initialDate/:endDate/:type', function (req, res) {
    var site = req.params.site; 
    var initialDate = req.params.initialDate;
    var endDate = req.params.endDate;
    var type = req.params.type;
    query = "SELECT valor, monto_servicio, tipo FROM PAQUETE, SUCURSAL WHERE SUCURSAL.id = PAQUETE.sucurcal_id and PAQUETE.retirado = 1 and PAQUETE.fecha_recepcion > "+ initialDate + " and PAQUETE.fecha_recepcion < "+endDate + " and PAQUETE.tipo = '" + type + "'";
    var total = 0;
    ConnectDB(query,site,function(jsonArray){            
        jsonArray.forEach(element => {
            total += element["valor"] + element["monto_servicio"];
        });
        res.send({total});
    });
  });

  module.exports = router;

  