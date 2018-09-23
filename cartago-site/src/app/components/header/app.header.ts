import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageManager } from '../../helpers/storage-manager';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: ['./app.header.css']
})
export class AppHeader implements OnInit{
  title = 'cartago-site';
  username : string;

  private storage : StorageManager;
  constructor(private auth: AuthenticationService){
    this.storage = new StorageManager();
    this.getUserName();
  }

  ngOnInit(){
    this.getUserName();
  }

  getUserName(){
    console.log(this.storage.getUserName());
    this.username = this.storage.getUserName();
  }

  logout(){
    this.auth.logout();
  }

  isAdmin() : boolean {
    return this.auth.isAdmin();
  }

}
