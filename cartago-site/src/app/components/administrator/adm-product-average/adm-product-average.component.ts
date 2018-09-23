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

  clients = [
    {name:'Cliente 1',id:'id product',average:5},
    {name:'Cliente 2',id:'id product2',average:16},
    {name:'Cliente 3',id:'id product3',average:8}
  ];
  pages = [{value:1},{value:4},{value:3},{value:4}]
  
  ngOnInit() {
  }
}
