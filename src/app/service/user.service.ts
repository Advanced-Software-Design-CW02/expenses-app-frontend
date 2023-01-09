import { ApiPath } from './../constant/ApiPath';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ExpenseService {
  constructor(private http: HttpClient) { 

  }

  public getExpenses(): Observable<{}>{
    return this.http.get(ApiPath.BACKEND+'expense/get');
  }

  public createExpenses(expens :any): Observable<{}>{
    return this.http.get(ApiPath.BACKEND+'expense/create',expens);
  }


}