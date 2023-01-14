import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from '../constant/ApiPath';

@Injectable()
export class UserTransactionService {
  constructor(private http: HttpClient) {}

  public createUserTransaction(
    categoryId: any,
    userId: any,
    amount: number,
    note: any,
    date: any,
    recurent: boolean = false
  ): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('categoryID', categoryId)
      .set('userID', userId)
      .set('amount', amount)
      .set('date', date)
      .set('recurring', recurent)
      .set('note', note);

    return this.http.get(ApiPath.BACKEND + 'usertransaction/create', {
      params: httParams,
    });
  }

  // get categories by Id
  public getCategoryById(userID: number): Observable<{}> {
    let httParams: HttpParams = new HttpParams().set('userID', userID);
    return this.http.get(
      ApiPath.BACKEND + 'usertransaction/getTransactionByUserID',
      {
        params: httParams,
      }
    );
  }

  // delete user transactions
  public deleteUserTransaction(userTransactionID: number): Observable<{}> {
    let httParams: HttpParams = new HttpParams().set(
      'userTransactionID',
      userTransactionID
    );
    return this.http.get(ApiPath.BACKEND + 'usertransaction/delete', {
      params: httParams,
    });
  }

  // update user transactions
  public updateUserTransaction(
    categoryID: any,
    userID: any,
    transactionID: any,
    userTransactionID: any,
    amount: number,
    note: any,
    date: any,
    recurring: boolean
  ): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('categoryID', categoryID)
      .set('userID', userID)
      .set('transactionID', transactionID)
      .set('userTransactionID', userTransactionID)
      .set('amount', amount)
      .set('date', date)
      .set('recurring', recurring)
      .set('note', note);

    return this.http.get(
      ApiPath.BACKEND + 'usertransaction/updateTransaction',
      {
        params: httParams,
      }
    );
  }
}
