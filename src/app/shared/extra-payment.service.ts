import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExtraPayment } from './models/ExtraPayment';

@Injectable()
export class ExtraPaymentService {
  private serviceListObs = new BehaviorSubject<ExtraPayment>(null);
  constructor(private http: HttpClient) {}

  checkServices() {
    const API_URL = 'http://api.cottage.test/api/services';
    this.http
      .get<ExtraPayment>(API_URL)
      .subscribe(
        result => {
          this.serviceListObs.next(result);
        },
        err => {
          console.log(err);
        }
      );
  }
  getListOfServices(): Observable<ExtraPayment> {
    return this.serviceListObs.asObservable();
  }



  postExtraPayments(extraPayent: ExtraPayment): Observable<any> {
    const API_URL = 'http://api.cottage.test/api/services';
      return this.http.post(API_URL, extraPayent);
  }
}
