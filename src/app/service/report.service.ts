import { Category } from './../model/Category';
import { ApiPath } from './../constant/ApiPath';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  // get spend report by category
  public getSpendRepotByCategory(userID: string): Observable<{}> {
    let httParams: HttpParams = new HttpParams().set('userID', userID);
    return this.http.get(ApiPath.BACKEND + 'report/categorySpend', {
      params: httParams,
    });
  }
}
