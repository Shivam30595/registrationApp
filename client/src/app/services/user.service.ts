import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/api/';
  registerUser(data): Observable<any>{
    return this.http.post(`${this.url}` + 'registerUser', data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}` + 'allUser');
  }
  checkEmailPhone(email, phoneNumber): Observable<any> {
    return this.http.get(`${this.url}` + 'checkEmail' + '?email=' + `${email}` + '&phone=' + `${phoneNumber}`);
  }
}
