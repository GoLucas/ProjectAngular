import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://api.cottage.test/api/user';
  public token: string;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  // private headers: Headers = new Headers({
  //   'Content-Type': 'application/json'
  // });

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
   }

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
  }
  // login(user): any {
  //   const url = `${this.BASE_URL}/login`;
  //   return this.http
  //     .post<ResponseLogin>(url, user, {
  //       headers: new HttpHeaders().set('Content-Type', 'application/json')
  //     })
  //     .subscribe(
  //       res => {
  //         localStorage.setItem('token', res.auth_token);
  //         localStorage.setItem('admin', res.admin);
  //         localStorage.setItem('user_id', res.user_id);
  //         console.log('response form server: ' + JSON.stringify(res));
  //       },
  //       err => {
  //         console.log('<POST>Error occured');
  //       }
  //     );
  // }

  // register(user: User): any {
  //   const url = `${this.BASE_URL}/create`;
  //   return this.http
  //     .post(url, user, {
  //       headers: new HttpHeaders().set('Content-Type', 'application/json')
  //     })
  //     .subscribe(
  //       res => {
  //         // localStorage.setItem('token', res.auth_token);
  //         console.log(res);
  //       },
  //       err => {
  //         console.log('Error occured');
  //       }
  //     );
  // }



  login(user): Observable<boolean> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).pipe(map((response: ResponseLogin) => {
        // login successful if there's a jwt token in the response

        const res = response;
        // const user_name = response.user_name;
        // const admin = response.admin;
        if (res.auth_token) {
            // set token property
            this.token = res.auth_token;
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', res.auth_token);
            localStorage.setItem('email', res.email);
            localStorage.setItem('admin', res.admin);
            console.log('Local storage (token): ' + localStorage.getItem('token'));
            console.log('Local storage (email): ' + localStorage.getItem('email'));
            console.log('Response: ' + Response);
            // return true to indicate successful login
            this.isLoginSubject.next(true);
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
    }));
  }

  register(user: User): Observable<boolean> {
    console.log(user);
    const url = `${this.BASE_URL}/create`;
    return this.http
      .post(url, user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).pipe(map((res: any) => {
          if (res.status === 'success') {
            return true;
          }else {
            return false;
          }
      }));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('admin');
    this.isLoginSubject.next(false);
    this.router.navigateByUrl('/login');
}

public isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  // Check whether the token is expired and return
  // true or false
  return !this.jwtHelper.isTokenExpired(token);
}

public isAdmin(): boolean {
  const token = localStorage.getItem('token');
  const tokenPayload = decode(token);
  return this.isAuthenticated() && tokenPayload.role === 'admin';
}

public userName(): Observable<string> {

  const API_URL = 'http://localhost:80/Project-API/public/api/user/get/';
  const token = localStorage.getItem('token');
  const tokenPayload = decode(token);
  return this.http.get<string>(`${API_URL}${tokenPayload.user_id}`);
}


}
