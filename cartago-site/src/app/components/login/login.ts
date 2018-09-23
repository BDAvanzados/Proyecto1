import { Component } from '@angular/core';

import {AuthenticationService} from '../../services/authentication.service'; 
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class AppLogin {


  user: User;
  name: string;

  constructor(private authentication: AuthenticationService){
    this.user = {name: '', password: ''};
  }

  login(){
    console.log(this.name);
    console.log("we are login now!");
    this.authentication.authenticate(this.user);
  }

}