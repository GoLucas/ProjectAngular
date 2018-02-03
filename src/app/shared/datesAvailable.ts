import { Http } from '@angular/http';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  HttpHeaders,
  HttpClientModule,
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationComponent } from '../secure/reservation/reservation.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CottageRes } from './models/CottageRes';


@Injectable()
export class DatesAvailable {
  private cottageListObs = new BehaviorSubject<Array<CottageRes>>([]);
  constructor(private http: HttpClient) {}

  checkDates(dates: any) {
    const API_URL = 'http://api.cottage.test/api/res';
    this.http
      .post<Array<CottageRes>>(API_URL, dates, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(
        result => {
          this.cottageListObs.next(result);
        },
        err => {
          console.log(err);
        }
      );
  }
  getListOfCottages(): Observable<Array<CottageRes>> {
    return this.cottageListObs.asObservable();
  }
}
