import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { UserReservationsService } from '../../shared/user-reservations.service';
import { DataSource } from '@angular/cdk/collections';
import { Reservation } from '../../shared/models/Reservation';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss'],
  providers: [UserReservationsService]
})
export class ReservationViewComponent implements OnInit {
  id: number;
  private sub: any;
  displayedColumns = ['name', 'start', 'end', 'status'];
  dataSource: any;
  constructor(private reservationsData: UserReservationsService) {}

  ngOnInit() {
    const token = decode(localStorage.getItem('token'));
    this.id = token.user_id;
    this.dataSource = new ReservationDataSource(this.reservationsData, this.id);
  }
}

export class ReservationDataSource extends DataSource<any> {
  id_user: any;
  constructor(private reservationsData: UserReservationsService, id: any) {
    super();
    this.id_user = id;
  }
  connect(): Observable<Reservation[]> {
    return this.reservationsData.httpGetReservations(this.id_user);
  }

  disconnect() {}
}
