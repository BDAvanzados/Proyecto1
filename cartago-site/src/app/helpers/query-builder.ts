import { User } from "../models/user";
import { QueryReadType } from "@angular/core/src/render3/interfaces/query";
import { StorageManager } from "./storage-manager";
import { UserData } from "../models/user-data";

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
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
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



}
