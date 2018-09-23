import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../../services/admin/administrator.service';
import { DateRangeContainer } from '../../../helpers/date-range-container';

@Component({
  selector: 'adm-product-average',
  templateUrl: './adm-product-average.component.html',
  styleUrls: ['./adm-product-average.component.css']
})
export class AdmProductAverageComponent  extends DateRangeContainer implements OnInit {

  constructor(private adminService : AdministratorService) {
    super();
   }

  clients;
  err;
  ngOnInit() {
  }


  getAverage(){
    console.log(this.dateRange)
    this.adminService.clientsAverage(this.dateRange[0].date,this.dateRange[1].date,this.dateRange[0].valid,this.dateRange[1].valid).subscribe(
      data => this.clients = data,
      error => this.err = error
    );    
  }

  
}
