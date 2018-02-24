import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TicketService } from '../../shared/ticket.service';
import decode from 'jwt-decode';
import { Ticket } from '../../shared/models/Ticket';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { ToasterService } from '../../shared/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketService]
})
export class TicketsComponent implements OnInit {
  ticketForm: FormGroup;
  user_id: any;
 // public ticketObs$: Observable<Ticket>;
  displayedColumns = ['message', 'status'];
  dataSource: any;
  constructor(
    private fb: FormBuilder,
     private ticketService: TicketService,
     private router: Router,
     public toasterService: ToasterService) { }

  ngOnInit() {
    const token = decode(localStorage.getItem('token'));
    this.user_id = token.user_id;
    this.ticketForm = this.fb.group({
      ticketMessage: ['', Validators.required],
      user_id: [this.user_id, Validators.required]
    });
  }

  sendTicket() {
    console.log(this.ticketForm.value);
    this.ticketService.httpPostTicket(this.ticketForm.value).subscribe(res => {
      this.toasterService.showToaster('wysłano zgłoszenie', 'success');
      this.router.navigateByUrl('/home');
      console.log(res);
    }, err => {
      this.toasterService.showToaster('nie można wysłać zgłoszenia', 'error');
      console.log(err);
    });
  }

  tabChange(event) {
    if ( event.index === 1) {
      // this.ticketService.httpGetAllUserTickets(this.user_id);
      // this.ticketObs$ = this.ticketService.getAllUserTickets();

      this.dataSource = new TicketDataSource(this.ticketService, this.user_id);

    }
  }

  get ticketMessage(){
    return this.ticketForm.get('ticketMessage') as FormControl;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export class TicketDataSource extends DataSource<any> {
  user_id: any;
  constructor(private ticketService: TicketService, user_id: any) {
    super();
    this.user_id = user_id;
  }
  connect(): Observable<Ticket[]> {
    return this.ticketService.httpGetAllUserTickets(this.user_id);
    // .catch(err => Observable.of(<any>([{ error: 'No results'}])))
  }

  disconnect() {}
}
