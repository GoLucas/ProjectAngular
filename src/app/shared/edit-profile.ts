import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExtraPayment } from './models/ExtraPayment';

@Injectable()
export class EditProfile {
  constructor(private http: HttpClient) {}

  postChangePassword(password: any): Observable<any> {
    const API_URL = 'http://api.cottage.test/api/changepassword';
      return this.http.post(API_URL, password);
  }

  postEditProfile(profile: any): Observable<any> {
    const API_URL = 'http://api.cottage.test/api/editprofile';
      return this.http.post(API_URL, profile);
  }
}
