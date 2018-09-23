import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { QueryBuilder } from '../helpers/query-builder';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  server: string;

  constructor(private http: HttpClient) {

    this.server = "http://192.168.0.9:3000/";

   }


  testDataBase(){

    let qb : QueryBuilder = new QueryBuilder();
    let a = this.http.get(this.server + "client/");
    return a; 
  }

  getAllPackages(){
    let qb : QueryBuilder = new QueryBuilder();
    return this.http.get(qb.allPackage());
  }

  getAddPackages(pkg : Package){
    let qb : QueryBuilder = new QueryBuilder();
    return this.http.get(qb.addPackage(pkg));
  }

}
