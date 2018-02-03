import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Reservation } from './models/Reservation';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserReservationsService {
  private reservationObs = new BehaviorSubject<Reservation>(null);
  constructor(private http: HttpClient) {}
  public API_URL = 'http://api.cottage.test/api/user/reservations/';

  httpGetReservations(id: any): Observable<Reservation[]> {
    console.log('Reservation Service');
    return this.http.get<Reservation[]>(this.API_URL + id);
    // .subscribe(
    //   result => {
    //     this.reservationObs.next(result);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  // getReservations(): Observable<Reservation> {
  //   return this.reservationObs.asObservable();
  // }
}
