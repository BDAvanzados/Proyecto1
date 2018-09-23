import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Constants } from '../models/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthenticationService, private router : Router){
  }

  canActivate(): boolean {


    if (this.auth.isLogged()){
      localStorage.setItem('value','this is a value!');
      if(this.auth.isAdmin()){
        return true;
      }
      this.router.navigate([Constants.HOME_PATH]);
      return false;
    }
    this.router.navigate([Constants.LOGIN_PATH]);
    return true;
  }
}
