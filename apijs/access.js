var Connection = require('tedious').Connection;
var Request = require('tedious').Request;


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
           database: 'Central-Heredia',
           encrypt: true,
           rowCollectionOnRequestCompletion: true
       }
  }


var SanJose = new Connection(SJConfig);
var Cartago = new Connection(CAConfig);
var Heredia = new Connection(HEConfig);


function isON(branch){
    branch.on('connect', function(err){
        if (err){
            console.log(err)
            return false;
        }else return true;
    });    
}


var ConnectDB = function(query,branch,callback){

        request = new Request(query,
               function(err, rowCount, rows){
                      jsonArray = [];
                      rows.forEach(function (columns) {
                          var rowObject ={};
                          columns.forEach(function(column) {
                              rowObject[column.metadata.colName] = column.value;
                          });
                          jsonArray.push(rowObject)
                      });
                      callback(jsonArray);
              }
        );

        if (branch=="SJ")SanJose.execSql(request);
        else if (branch=="CA")Cartago.execSql(request);
        else if (branch=="HE")Heredia.execSql(request);
        /*if (branch=="SJ"){
            if (isON(SanJose))SanJose.execSql(request);
            else {
                if (isON(Heredia))Heredia.execSql(request)
                else console.log("no conection avalable"); 
            }
        }else if (branch=="CA"){
            if (isON(Cartago))Cartago.execSql(request);
            else {
                if (isON(Heredia))Heredia.execSql(request)
                else console.log("no conection avalable"); 
            }
        }else if (branch=="HE"){
            if (isON(Heredia))Heredia.execSql(request)
                else console.log("no conection avalable"); 
        }*/

        
    };

module.exports = ConnectDB;
