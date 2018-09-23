import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../../services/admin/administrator.service';

@Component({
  selector: 'adm-totals',
  templateUrl: './adm-totals.component.html',
  styleUrls: ['./adm-totals.component.css']
})
export class AdmTotalsComponent implements OnInit {

  constructor(private admservice : AdministratorService) { }
  total = -1;

  getTotals(){
    this.admservice.getTotals().subscribe(data => this.total = data[0].total, 
      error => alert('no se puede conectar con el servidor ' + error.message));
  }

  ngOnInit() {
    this.getTotals();
  }


}
