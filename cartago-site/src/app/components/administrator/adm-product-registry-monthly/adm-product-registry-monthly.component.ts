import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'adm-product-registry-monthly',
  templateUrl: './adm-product-registry-monthly.component.html',
  styleUrls: ['./adm-product-registry-monthly.component.css']
})
export class AdmProductRegistryMonthlyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  months = [
    {name:"Enero"},
    {name:"Febrero"},
    {name:"Marzo"},
    //
    {name:"Abril"},
    {name:"Mayo"},
    {name:"Junio"},
    //
    {name:"Julio"},
    {name:"Agosto"},
    {name:"Setiembre"},
    //
    {name:"Octubre"},
    {name:"Noviembre"},
    {name:"Diciembre"},
  ]

  packages = [
    {name:'Package 1', sold: 5},
    {name:'Package 2', sold: 4},
    {name:'Package 3', sold: 7},
    {name:'Package 4', sold: 9},
    {name:'Package 5', sold: 15}
  ]


  pages=[
    {value:1},
    {value:2},
    {value:3},
    {value:4},
    {value:5}
  ]


}
