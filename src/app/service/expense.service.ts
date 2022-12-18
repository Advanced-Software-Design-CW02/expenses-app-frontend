import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ExpenseService {
  constructor(private http: HttpClient) { 

  }

  OnInit(){
    this.getExpenses();
  }

  public getExpenses(): Observable<{}>{
    return this.http.get('http://localhost:9090/expense/get')
  }
}