import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryBuilder } from '../../helpers/query-builder';
import { Client } from '../../models/client';

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
                  {status:boolean,data: Observable<Client[]> } | {status : boolean}
    {
    let qb : QueryBuilder = new QueryBuilder();
    if (isValidA && isValidB)
      return {status: true,data: this.http.get<Client[]>(qb.getClients(dateFrom, dateTo))};
    else  {status : false};
  }


}
