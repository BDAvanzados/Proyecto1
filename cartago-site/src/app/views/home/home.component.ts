import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

  isAdmin() : boolean {
    return this.auth.isAdmin();
  }

  isClient() : boolean{
    return this.auth.isClient();
  }

}
