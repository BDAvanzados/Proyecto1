import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {User} from '../models/user';
import { Observable } from 'rxjs';
import { PLATFORM_BROWSER_ID } from '@angular/common/src/platform_id';
import { Router } from '@angular/router';
import {Constants} from '../models/constants';
import { StorageManager } from '../helpers/storage-manager';
import { QueryBuilder } from '../helpers/query-builder';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  sdata : any ;

  private storage : StorageManager;
  constructor(private http  : HttpClient, private router : Router, ) {
    this.storage = new StorageManager();
   }



  public isAdmin() : boolean{
    return this.storage.getUserType() == Constants.ADMIN_TYPE;
  }

  public isClient() : boolean{
    return this.storage.getUserType() == Constants.CLIENT_TYPE;
  }

  public isLogged() : boolean{
    return this.storage.getLogged() == Constants.IS_LOGGED;
  }


  private goTo(path:string){
    this.router.navigate([path]);
  }

  private setUpUser(userdata : any, usertype : string){
    console.log("user data is: ")
    console.log(userdata)
    this.storage.setUserType(usertype);
    this.storage.setUserData(JSON.stringify(userdata));
    this.storage.setUserName(userdata[Constants.USERNAME]);
  }

  private saveUserData(data : any) : boolean{
    
    console.log('data is: ' +  data);
    console.log(data);


    //if the data user is correct save it! and reload the page
    if(data != null && data.status == null){
      console.log('inserting user data: ')
      console.log('rol: ' + data.rolId)
      this.storage.setAsLogged();
      switch (data.rolId) {
        case Constants.ROL_ADMIN:
          this.setUpUser(data,Constants.ADMIN_TYPE);
          break;
        case Constants.ROL_CLIENT_GOLD:
          this.setUpUser(data,Constants.CLIENT_TYPE);
        break;
        case Constants.ROL_CLIENT_PLATINUM:
          this.setUpUser(data,Constants.CLIENT_TYPE);
        break;
        case Constants.ROL_MANAGER:
          this.setUpUser(data,Constants.MANAGER_TYPE);
        break;
        default:
          console.log('Default!');
          break;
      }
      this.goTo(Constants.HOME_PATH);
    }
    else{
      console.log("else case!")
      if (data == null)alert("Error!")
      else if (data.err == Constants.DATABASE_CONEXION_ERROR)
        alert('No se puede comunicar con el servidor');
      else if (data.err == Constants.USER_AND_PASSWORD_INCORRECT || data.err == Constants.WRONG_ANSWER) 
        alert('Usuario o contraseña incorrectos');
      else if (data.err == Constants.WRONG_BRANCH)
        alert('Usted no está autorizado a fungir en esta sede');
      else alert('la pagina web tiene un error... por favor contactenos');
    }
    return data != null && data.status;
  }

  public authenticate(user:User) : void{


    let qb : QueryBuilder = new QueryBuilder();
    let query = qb.auth(user);
    console.log(query);
    let query_data : Observable<Object>  = this.http.get(query);
    let serror = null;
    
    query_data.subscribe(data => this.saveUserData(data),
                        error => serror = error);
  }

  public logout() : void{
    console.log('Logout!');
    this.storage.setAsUnLogged();
    this.goTo(Constants.LOGIN_PATH);
  }


}
