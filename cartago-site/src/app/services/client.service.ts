import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientPackage } from '../models/client-package';
import { Observable } from 'rxjs';
import { QueryBuilder } from '../helpers/query-builder';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient, private router : Router) { }



  public getClientPackages() : Observable<ClientPackage[]>{
    let bq : QueryBuilder = new QueryBuilder();
    return this.http.get<ClientPackage[]>(bq.clientPackages());
  }
}
