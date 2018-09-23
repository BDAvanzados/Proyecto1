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
    {name:"Enero", value : 1},
    {name:"Febrero", value : 2},
    {name:"Marzo", value : 3},
    //
    {name:"Abril", value : 4},
    {name:"Mayo", value : 5},
    {name:"Junio", value : 6},
    //
    {name:"Julio", value : 7},
    {name:"Agosto", value : 8},
    {name:"Setiembre", value : 9},
    //
    {name:"Octubre" , value : 10},
    {name:"Noviembre", value : 11},
    {name:"Diciembre", value : 12},
  ]

  packages = [
  ]


  pages=[
  ]


}
