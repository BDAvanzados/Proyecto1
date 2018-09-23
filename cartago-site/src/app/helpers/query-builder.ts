import { User } from "../models/user";
import { QueryReadType } from "@angular/core/src/render3/interfaces/query";
import { StorageManager } from "./storage-manager";
import { UserData } from "../models/user-data";
import { Client } from "../models/client";
import { Package } from "../models/package";

//importing the server path
//@ts-ignore
var config = require('./../../config.json');

export class QueryBuilder {

    private static SERVER_NAME : string = "server";
    private static SUCURSAL_ID_NAME : string = "sucursal-id";
    private static sucursal_id : string = "ID";
    static server : string = "/server/";
    static SIGN : string = "sign/";


    constructor(){
        QueryBuilder.server = config[QueryBuilder.SERVER_NAME]; 
        QueryBuilder.sucursal_id = config[QueryBuilder.SUCURSAL_ID_NAME];
    }

    private fullQuery(path: string, operation:string, sucursal : boolean = true):string {
        if (!sucursal) return QueryBuilder.server + path;
        return QueryBuilder.server + operation + QueryBuilder.sucursal_id + "/" + path;
    }

    /**
     * auth
     */
    public auth(user : User):string {
        var path:string =  user.name + "/" + user.password;
        return this.fullQuery(path,QueryBuilder.SIGN);
    }

    public totals() : string {
        let path : string  = 'admi/total/' + QueryBuilder.sucursal_id;
        return QueryBuilder.server + path;
    }

    public clientPackages() : string{
        let sm : StorageManager = new StorageManager();
        let userdata: UserData = JSON.parse(sm.getUserData());
        console.log(userdata);
        //:site/:clientId/:startDate/:finishDate/
        let path : string  = 'admi/clientsmypkgs/' + QueryBuilder.sucursal_id + 
            '/' + userdata.clientId + '/'+ '2000-01-02' + '/' + '2000-01-01';
        console.log(QueryBuilder.server + path);
        return QueryBuilder.server + path;
    }

    private date2Str(date : Date ) : string {
        let day = (date.getMonth()+1);
        //if (day < 10)
        return date.getFullYear() + "-" + day + "-" + date.getDate();
    }

    public getClients(dateFrom : Date, dateTo : Date) : string{
        if (dateFrom != null && dateTo != null){
            let path : string  = "admi/clientspkg/" + QueryBuilder.sucursal_id + "/" + dateFrom
                + "/" + dateTo;
            console.log(QueryBuilder.server + path);
            return QueryBuilder.server + path;
        }
        return null;

    }

    public getClientProducts(client : Client, datea : string, dateb : string){
        let path : string  = 'admi/clientsmypkgs/' + QueryBuilder.sucursal_id + 
            '/' + client.clientId + '/'+ datea + '/' + dateb;
        console.log(QueryBuilder.server + path);
        return QueryBuilder.server + path;
    }

    public checkPackage(data : {
        clientId : string,
        sucursalId : string,
        date : Date,
        pgk : string
      }){
        let path : string  = 'admi/updatepkg/' + data.sucursalId + '/'+ data.clientId  
              + '/' +data.pgk + '/' + data.date.toJSON().slice(0,10);
        console.log(QueryBuilder.server + path);
        return QueryBuilder.server + path;
    }

    public static sucursalID(){
        return QueryBuilder.sucursal_id;
    }

    public average(dateleft,dateb){
        console.log(dateleft)
        console.log(dateb)
        let path : string  = 'admi/averageperclient/' + QueryBuilder.sucursal_id + '/'+ 
        dateleft + '/' + dateb;
        console.log(QueryBuilder.server + path);
        return QueryBuilder.server + path;
    }

    public allPackage(){
        return QueryBuilder.server + 'admi/pkgs/' + QueryBuilder.sucursalID();
    }


    public addPackage(pkg : Package){
        let sm : StorageManager = new StorageManager();
        let userdata: UserData = JSON.parse(sm.getUserData());

        return QueryBuilder.server + 'admi/addpkgs/' + QueryBuilder.sucursalID() +"/"+ userdata.clientId
        + "/" + pkg.id;
    }


}
