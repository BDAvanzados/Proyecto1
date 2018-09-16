var Connection = require('tedious').Connection;

var SJConfig = {
    userName: 'agnaktor',
    password: '4Gn4kt0r',
    server: 'sanjose-node.database.windows.net',
    options:{
           database: 'sanjose-node',
           encrypt: true,
           rowCollectionOnRequestCompletion: true
       }
  }


  var CAConfig = {
    userName: 'agnaktor',
    password: '4Gn4kt0r',
    server: 'cartago-node.database.windows.net',
    options:{
           database: 'cartago-node',
           encrypt: true,
           rowCollectionOnRequestCompletion: true
       }
  }


  var HEConfig = {
    userName: 'agnaktor',
    password: '4Gn4kt0r',
    server: 'heredia-central.database.windows.net',
    options:{
           database: 'heredia-central',
           encrypt: true,
           rowCollectionOnRequestCompletion: true
       }
  }

//var SanJose = new Connection(SJConfig);
var Cartago = new Connection(CAConfig);
//var Heredia = new Connection(HEConfig);


//module.exports = SanJose;
module.exports = Cartago;
//module.exports = Heredia;