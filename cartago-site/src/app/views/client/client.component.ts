import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientPackage } from '../../models/client-package';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService : ClientService, private commonService : CommonService) { }


  packages : ClientPackage [] = [];
  availablepgk;
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

  getAllAvailablePackage(){
    this.commonService.getAllPackages().subscribe(
      data => this.availablepgk = data,
      error => console.log("error") 
    )
  }

  addPackage(){
    
  }

}
