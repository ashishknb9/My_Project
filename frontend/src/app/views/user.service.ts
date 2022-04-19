import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userListApi = "http://localhost:7789/user-list";
  userCreateApi = "http://localhost:7789/create-user";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //get all user data   
  getAll(): Observable<any> {
    return this.httpClient.get(this.userListApi)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // create user
   create(data: any): Observable<any> {
    let API_URL = '${this.userCreateApi}';
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }  

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
