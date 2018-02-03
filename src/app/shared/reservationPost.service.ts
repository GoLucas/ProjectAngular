import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cottage } from './models/Cottage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ReservstionPostService {
public token;
  constructor(private http: HttpClient) {}

  httpPostReservation(data: any): Observable<any> {
    const API_URL = `http://api.cottage.test/api/user/reservation`;
    return this.http.post(API_URL, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
  }
}
//.set('Authorization', `Bearer ${this.token}`)
