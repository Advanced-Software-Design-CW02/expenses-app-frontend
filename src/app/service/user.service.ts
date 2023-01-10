import { ApiPath } from './../constant/ApiPath';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<{}> {
    return this.http.get(ApiPath.BACKEND + 'user/getall');
  }

  public createUser(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    job: string
  ): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName)
      .set('email', email)
      .set('age', age)
      .set('job', job);
    return this.http.get(ApiPath.BACKEND + 'user/create', {
      params: httParams,
    });
  }

  public getUserByIDUser(id: any): Observable<{}> {
    let httParams: HttpParams = new HttpParams().set('id', id);
    return this.http.get(ApiPath.BACKEND + 'user/getuser', {
      params: httParams,
    });
  }

  public addCategoryToUser(user_id: any, category_id: any): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('user_id', user_id)
      .set('category_id', category_id);
    return this.http.get(ApiPath.BACKEND + 'user/addcategory', {
      params: httParams,
    });
  }

  public removeCategoryFromUser(
    user_id: any,
    category_id: any
  ): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('user_id', user_id)
      .set('category_id', category_id);
    return this.http.get(ApiPath.BACKEND + 'user/removecategory', {
      params: httParams,
    });
  }
}
