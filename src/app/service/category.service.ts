import { Category } from './../model/Category';
import { ApiPath } from './../constant/ApiPath';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {

    }

    public createCategory( category: Category ): Observable<{}> {
        return this.http.post(ApiPath.BACKEND + 'category/create',category);
    }

    public getAllCategory(): Observable<{}> {
        return this.http.get(ApiPath.BACKEND + 'category/getall');
    }

    public getCategoryById(categoryId :number): Observable<{}> {
        let httParams: HttpParams = new HttpParams().set("id", categoryId)
        return this.http.get(ApiPath.BACKEND + 'category/getcategory');
    }
  
    public deleteCategoryById(categoryId :number): Observable<{}> {
        let httParams: HttpParams = new HttpParams().set("id", categoryId)
        return this.http.delete(ApiPath.BACKEND + 'category/getcategory');
    }
  





}