import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DateRangeContainer } from '../../../helpers/date-range-container';
import { AdministratorService } from '../../../services/admin/administrator.service';
import { Client } from '../../../models/client';
import { Package } from '../../../models/package';

@Component({
  selector: 'adm-product-per-client',
  templateUrl: './adm-product-per-client.component.html',
  styleUrls: ['./adm-product-per-client.component.css']
})
export class AdmProductPerClientComponent extends DateRangeContainer implements OnInit {

  constructor(private adminService : AdministratorService) {
    super();
  }

  ngOnInit() {

    if (this.currentClient != null)this.updatePackages(null);
  }

  packages : Package[];

  clients = [];

  error : string;

  currentClient : Client;

  public processClients(data){
    this.clients =  data;
    console.log(this.clients);
  }

  public processError(error){
    
  }


  showModal(){
    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  }

  getClients(){
    console.log('finding clients')
    this.adminService.getClient(this.dateRange[0].date,this.dateRange[1].date,this.dateRange[0].valid,this.dateRange[1].valid).subscribe(
      data => this.processClients(data),
      error => this.processError(error)
    );

  }

  processPackages(data : Package[]){
    this.packages = data;
  }

  askForClientPackages(client:Client){   
    this.currentClient = client;
    this.adminService.getClientProducts(client,this.dateRange[0].date,this.dateRange[1].date).subscribe(
      data => this.processPackages(data),
      error => this.error = error
    );
  }


  checkPackage(ppackage : Package){
    let packagecp = ppackage;
    this.adminService.checkPackage(packagecp, this.currentClient).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.eventMess.emit();
    //this.sendSignalUpdatePackages();
  }

  @Output() eventMess = new EventEmitter();

  public updatePackages($event){
    console.log("updating!");
    this.adminService.getClientProducts(this.currentClient,this.dateRange[0].date,this.dateRange[1].date).subscribe(
      data => this.processPackages(data),
      error => this.error = error
    );
  }

  @Input() updatePack(){

  }

  public sendSignalUpdatePackages(){
    console.log("signal!");
    this.eventMess.emit();
  }



}
