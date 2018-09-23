var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var TYPES = require('tedious').TYPES;

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

var ConnectDB = function(query,branch,callback){

    request = new Request(query,
        function(err, rowCount, rows){
            if (err){
                console.log(branch +" caido")
                if (branch!="HE"){
                    ConnectDB(query,"HE",function(json){
                    callback(json);
                    });
                }else {
                    console.log(err);
                    callback({status:false ,error:'Cant acces the database'});
                }
            }else{
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
        }
    );

        if (branch=="SJ")SanJose.execSql(request);
        else if (branch=="CA")Cartago.execSql(request);
        else if (branch=="HE")Heredia.execSql(request);
    };

var ConnectST = function(str,params,branch,callback){

    request = new Request(str,function(err, rowCount, rows){

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
    
    params.forEach(param => {
        request.addParameter(param.name,param.type,param.value);
    });


    branch = 'HE';

    if (branch=="SJ")
        SanJose.callProcedure(request);
    else if (branch=="CA")
        Cartago.callProcedure(request);
    else if (branch=="HE"){

        Heredia.callProcedure(request);
    }
};

    module.exports = ConnectDB;
    module.exports = ConnectST;
