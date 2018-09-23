import { Component, OnInit, Input } from '@angular/core';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DateRangeContainer } from '../../../helpers/date-range-container';
import { AdministratorService } from '../../../services/admin/administrator.service';

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
  }



  clients = [
    {name:'Cliente 1',id:'id product',packages:5},
    {name:'Cliente 2',id:'id product2',packages:16},
    {name:'Cliente 3',id:'id product3',packages:8},
    {name:'Cliente 3',id:'id product3',packages:8},
    {name:'Cliente 3',id:'id product3',packages:8},
    {name:'Cliente 3',id:'id product3',packages:8},
    {name:'Cliente 3',id:'id product3',packages:8},
    {name:'Cliente 3',id:'id product3',packages:8}
  ];

  pages = [
    {value: 1},{value: 2},{value: 3},{value: 4}
  ]

  error : string;

  public processClients(data){
    if (data.status){
      this.error = "";
      this.clients =  data.data;
    }
    else{
      this.error = "Debe seleccionar ambas fechas";
    }

  }

  public processError(error){

  }

  getClients(){
    console.log('finding clients')
    this.adminService.getClient(this.dateRange[0].date,this.dateRange[1].date,this.dateRange[0].valid,this.dateRange[1].valid).subscribe(
      data => this.processClients(data),
      error => this.processError(error)
    );

  }


}
