import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private auth : AuthenticationService, private router : Router){
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLogged()){
      this.router.navigate([Constants.HOME_PATH]);
    }
    return !this.auth.isLogged();
  }
}
