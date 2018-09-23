import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientPackage } from '../../models/client-package';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService : ClientService) { }


  packages : ClientPackage [] = [];
  cart = [];
  buy = [];

  ngOnInit() {
    this.clientService.getClientPackages().subscribe(data => this.packages = data, error => console.log(error));
  }

  packageEmpty(){
    return this.packages.length == 0;
  }

  cartEmpty(){
    return this.cart.length == 0;
  }


  buyEmpty(){
    return this.buy.length == 0;
  }

}
