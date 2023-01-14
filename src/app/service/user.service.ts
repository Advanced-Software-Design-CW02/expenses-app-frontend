import { ApiPath } from './../constant/ApiPath';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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
    job: string,
    password: string
  ): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName)
      .set('email', email)
      .set('age', age)
      .set('job', job)
      .set('password', password);
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

  public userLogin(email: any, password: any): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get(ApiPath.BACKEND + 'user/login', {
      params: httParams,
    });
  }

  public updateUser(
    id: any,
    firstName: any,
    lastName: any,
    email: any,
    job: any,
    age: any
  ): Observable<{}> {
    let httParams: HttpParams = new HttpParams()
      .set('email', email)
      .set('lastName', lastName)
      .set('user_id', id)
      .set('job', job)
      .set('age', age)
      .set('firstName', firstName);
    return this.http.get(ApiPath.BACKEND + 'user/update', {
      params: httParams,
    });
  }
}
