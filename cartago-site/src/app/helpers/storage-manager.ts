import { Constants } from "../models/constants";
import { Inject, Injectable } from "@angular/core";


@Injectable()
export class StorageManager {

    constructor(){
    }

    public getUserName(): string{
        return localStorage.getItem(Constants.USER_NAME);
    }
    public setUserName(username : string) {
        localStorage.setItem(Constants.USER_NAME, username);
    }

    public setAsLogged(){
        localStorage.setItem(Constants.LOGGED, Constants.IS_LOGGED);
    }
    public setAsUnLogged(){
        localStorage.removeItem(Constants.LOGGED);
    }

    public getLogged() : string{
        return localStorage.getItem(Constants.LOGGED);
    }

    public setUserType(userType: string){
        if (userType == Constants.CLIENT_TYPE || userType == Constants.ADMIN_TYPE)
            localStorage.setItem(Constants.USER_TYPE,userType);
    }
    public getUserType() : string {
        return localStorage.getItem(Constants.USER_TYPE);
    }

    public setUserData(userType: any){
        localStorage.setItem(Constants.USER_DATA,userType);
    }
    public getUserData() : any {
        return localStorage.getItem(Constants.USER_DATA);
    }
}
