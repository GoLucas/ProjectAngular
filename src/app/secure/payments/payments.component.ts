import {UserReservationsService} from '../../shared/user-reservations.service';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { UserPaymentsService } from '../../shared/user-payments.service';
import { Payment } from '../../shared/models/Payment';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { Reservation } from '../../shared/models/Reservation';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [UserPaymentsService, UserReservationsService]
})
export class PaymentsComponent implements OnInit {
  resObs$: Observable<Reservation[]>;
  private reservationObs = new BehaviorSubject<Reservation[]>(null);
  id: number;
  private sub: any;
  displayedColumns = ['name', 'service_amount', 'payment_amount', 'status'];
  dataSource: any;


  constructor(private paymentsData: UserPaymentsService, private reservationsData: UserReservationsService) {}

  ngOnInit() {
    const token = decode(localStorage.getItem('token'));
    this.id = token.user_id;
    this.reservationsData.httpGetReservations(this.id).subscribe(res => {
    this.reservationObs.next(res);
    });
    this.resObs$ = this.reservationObs.asObservable();
    console.log(this.resObs$);


  }

  onChange(event) {
    this.dataSource = new ReservationDataSource(this.paymentsData, event.value);
}

}

export class ReservationDataSource extends DataSource<any> {
  reservation_id: any;
  constructor(private paymentsData: UserPaymentsService, reservation_id: any) {
    super();
    this.reservation_id = reservation_id;
  }
  connect(): Observable<Payment[]> {
    return this.paymentsData.httpGetPayments(this.reservation_id);
    // .catch(err => Observable.of(<any>([{ error: 'No results'}])))
  }

  disconnect() {}
}
