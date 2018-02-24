import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './models/Ticket';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService {
  //private TicketObs = new BehaviorSubject<Ticket>(null);

  constructor(private http: HttpClient) {}
  public API_URL = 'http://api.cottage.test/api/user/ticket';
  public API_URL2 = 'http://api.cottage.test/api/user/tickets/';


  httpGetAllUserTickets(id: any) {
    return this.http.get<Ticket[]>(this.API_URL2 + id);
    // .subscribe(
    //   res => {
    //     this.TicketObs.next(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  // getAllUserTickets(): Observable<Ticket> {
  //   return this.TicketObs.asObservable();
  // }


  httpPostTicket(data: any) {
    return this.http.post(this.API_URL, data);
  }

}
