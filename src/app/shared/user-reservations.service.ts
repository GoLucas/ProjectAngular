import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Reservation } from './models/Reservation';
import { Observable } from 'rxjs/Observable';
import { ResStatus } from './models/ResStatus';
import { ToasterService } from './toaster.service';


@Injectable()
export class UserReservationsService {
  private reservationObs = new BehaviorSubject<Array<Reservation>>(null);
  private statusesObs = new BehaviorSubject<ResStatus>(null);
  private payStatusesObs = new BehaviorSubject<ResStatus>(null);
  private errorObs = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, public toasterService: ToasterService) {}
  public API_URL = 'http://api.cottage.test/api/user/reservations/';
  public API_URL2 = 'http://api.cottage.test/api/reservations/';
  public API_URL3 = 'http://api.cottage.test/api/reservations/statuses';
  public API_URL4 = 'http://api.cottage.test/api/user/changereservationstatus';
  public API_URL5 = 'http://api.cottage.test/api/payments/statuses';
  public API_URL6 = 'http://api.cottage.test/api/user/changepaymentstatus';
  public API_URL7 = 'http://api.cottage.test/api/reservation/enddate';
  public API_URL8= 'http://api.cottage.test/api/reservation/';

  httpGetReservations(id: any): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.API_URL + id);
  }

  httpGetAllReservations(data: any) {
    return this.http.get<Array<Reservation>>(this.API_URL2 + data.start + '/' + data.end).subscribe(
      result => {
        this.reservationObs.next(result);
        console.log(result);
      },
      err => {
        this.errorObs.next(err);
        console.log(err);
      }
    );
  }

  httpGetReservationStatuses() {
    return this.http.get<ResStatus>(this.API_URL3).subscribe(
      res => {
        this.statusesObs.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  httpGetPaymentsStatuses() {
    return this.http.get<ResStatus>(this.API_URL5).subscribe(
      res => {
        this.payStatusesObs.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllReservations(): Observable<Array<Reservation>> {
    return this.reservationObs.asObservable();
  }

  getAllStatuses(): Observable<ResStatus> {
    return this.statusesObs.asObservable();
  }

  getAllPaymentStatuses(): Observable<ResStatus> {
    return this.payStatusesObs.asObservable();
  }

  httpPostReservationStatus(data: any) {
    return this.http.post(this.API_URL4, data);
  }

  httpPostPaymentStatus(data: any) {
    return this.http.post(this.API_URL6, data);
  }

  httpPostSetEndResDate(data: any) {
    return this.http.post<any>(this.API_URL7, data);
  }

  httpDeleteReservation(id: any) {
    console.log(this.API_URL8 + id);
    return this.http.delete(this.API_URL8 + id);
  }

  getError(): Observable<any> {
    return this.errorObs.asObservable();
  }
}
