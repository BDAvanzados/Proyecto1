import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryBuilder } from '../../helpers/query-builder';
import { Client } from '../../models/client';
import { Package } from '../../models/package';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  constructor(private http : HttpClient) { }


  public getTotals() : Observable<Object>{
    let qb : QueryBuilder = new QueryBuilder();
    return this.http.get(qb.totals());
  }

  public getClient(dateFrom : Date, dateTo : Date, isValidA: boolean, isValidB:boolean) : 
                  Observable<Client[]>
    {
    let qb : QueryBuilder = new QueryBuilder();
    if (isValidA && isValidB)
      return this.http.get<Client[]>(qb.getClients(dateFrom, dateTo));
    else  null;
  }

  public getClientProducts(client : Client,datea : string,dateb : string) : Observable<Package[]>{
    let qb : QueryBuilder = new QueryBuilder();
    return this.http.get<Package[]>(qb.getClientProducts(client,datea,dateb));
  }

  public checkPackage(ppackage : Package, client : Client){
    let qb : QueryBuilder = new QueryBuilder();
    let body = {
      clientId : client.clientId,
      sucursalId : QueryBuilder.sucursalID(),
      date : new Date(),
      pgk : ppackage.id
    }
    return this.http.get(qb.checkPackage(body));
  }


  public clientsAverage(datea,dateb, isValidA: boolean, isValidB:boolean){
    console.log(datea)
    console.log(dateb)
    
    let qb : QueryBuilder = new QueryBuilder();
    if (isValidA && isValidB)
      return this.http.get(qb.average(datea,dateb));
    return null;
  }

}
