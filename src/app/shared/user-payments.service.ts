import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Payment } from './models/Payment';

@Injectable()
export class UserPaymentsService {
  private reservationObs = new BehaviorSubject<Payment>(null);
  constructor(private http: HttpClient) {}
  public API_URL = 'http://api.cottage.test/api/user/payments/';
  // id rezerwacji
  httpGetPayments(id: any): Observable<Payment[]> {
    console.log('Payment Service');
    return this.http.get<Payment[]>(this.API_URL + id);
  }
}
