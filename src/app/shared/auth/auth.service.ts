import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:80/Project-API/public/api/user';
  // private headers: Headers = new Headers({
  //   'Content-Type': 'application/json'
  // });
  constructor(private http: HttpClient) {}

  login(user): any {
    const url = `${this.BASE_URL}/login`;
    return this.http
      .post<ResponseLogin>(url, user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(
        res => {
          localStorage.setItem('token', res.auth_token);
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  register(user: User): any {
    const url = `${this.BASE_URL}/create`;
    return this.http
      .post(url, user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(
        res => {
          // localStorage.setItem('token', res.auth_token);
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
  }


  // ensureAuthenticated(token): any {
  //   const url = `${this.BASE_URL}/status`;
  //   const headers: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   });
  //   return this.http.get(url, { headers: headers }).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log('Error occured');
  //     }
  //   );
  // }
}
