import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reservation } from '../../shared/models/Reservation';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserReservationsService } from '../../shared/user-reservations.service';
import * as moment from 'moment';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ResStatus } from '../../shared/models/ResStatus';
import { UserPaymentsService } from '../../shared/user-payments.service';
import { Payment } from '../../shared/models/Payment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PayStatus } from '../../shared/models/PayStatus';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToasterService } from '../../shared/toaster.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  providers: [UserReservationsService, UserPaymentsService]
})

export class StatusComponent implements OnInit {
  public Reservations$: Observable<Array<Reservation>>;
  public ResStatuses$: Observable<ResStatus>;
  public PayStatuses$: Observable<PayStatus>;
  public start: any;
  public end: any;
  matcher = new MyErrorStateMatcher();
  public reqdate: any;
  public dateForm: FormGroup;
  public minDate = moment();
  public maxDate = moment('2019-03-31');
  public errData = false;
  StatusFormGroup: FormGroup;
  ResFormGroup: FormGroup;
  PaymentFormGroup: FormGroup;
  todayDate: any;
  payObs$: Observable<Payment[]>;
  error$: Observable<any>;
  private paymentObs = new BehaviorSubject<Payment[]>(null);

  constructor(
    private allReservations: UserReservationsService,
    private fb: FormBuilder,
    private paymentsData: UserPaymentsService,
    public toasterService: ToasterService,
    private router: Router) {
      this.dateForm = this.fb.group({
        dateStart: [''],
        dateEnd: ['']
      }, { validator: [this.checkDates, Validators.required] });
     }

     checkDates(group: FormGroup) {
      if (group.controls.dateEnd.value < group.controls.dateStart.value) {
        return { endDateLessThanStartDate: true };
      }
      return null;
    }


  ngOnInit() {

    this.todayDate = moment();

    this.StatusFormGroup = this.fb.group({
      res_status_id: ['', Validators.required],
      res_id: []
    });

    this.ResFormGroup = this.fb.group({
      res_id: ['', Validators.required],
    });

    this.PaymentFormGroup = this.fb.group({
      payment_id: ['', Validators.required],
      payment_status_id: ['', Validators.required]
    });


  }

  check() {
    this.reqdate  = {
      start: this.dateForm.get('dateStart').value.unix(),
      end : this.dateForm.get('dateEnd').value.unix()
    };
    this.allReservations.httpGetAllReservations(this.reqdate);
    this.Reservations$ = this.allReservations.getAllReservations();
    this.Reservations$.subscribe(res => {

      if (res.length > 0) {
        this.errData = false;
      }else {
        this.errData = true;
      }
    });
  }


  onChange(event) {
    this.allReservations.httpGetReservationStatuses();
    this.ResStatuses$ = this.allReservations.getAllStatuses();
    this.ResStatuses$.subscribe(res => {
    });


    this.allReservations.httpGetPaymentsStatuses();
    this.PayStatuses$ = this.allReservations.getAllPaymentStatuses();
    this.PayStatuses$.subscribe(res => {
    });

    this.paymentsData.httpGetPayments(event.value).subscribe(res => {
      this.paymentObs.next(res);
      });
      this.payObs$ = this.paymentObs.asObservable();



  }

  changeResStatus() {
    console.log(this.ResFormGroup.value);
    this.StatusFormGroup.controls['res_id'].setValue(this.ResFormGroup.get('res_id').value);
    this.allReservations.httpPostReservationStatus(this.StatusFormGroup.value).subscribe( res => {
      this.toasterService.showToaster('zmieniono status rezerwacji', 'info');
      console.log(res);
    }, err => {
      console.log(err);
    });
  }


  changePaymentStatus() {

    this.allReservations.httpPostPaymentStatus(this.PaymentFormGroup.value).subscribe( res => {
      this.toasterService.showToaster('zmieniono status płatnoci', 'info');
      console.log(res);
    }, err => {
      console.log(err);
    });
  }


  endResDate() {
    const res_id = this.ResFormGroup.value;
    console.log(res_id);
    this.allReservations.httpPostSetEndResDate(res_id).subscribe( res => {
      if(res.success === false) {
        this.toasterService.showToaster(res.message, 'warning');
      }else {
        this.toasterService.showToaster('zmieniono date zakończenia rezerwacji', 'success');
      }
      console.log(res);
    }, err => {
      this.toasterService.showToaster('wystąpił błąd', 'error');
      console.log(err);
    });

  }

  deleteReservation() {
    const res_id = this.ResFormGroup.get('res_id').value;
    this.allReservations.httpDeleteReservation(res_id).subscribe( res => {
        this.toasterService.showToaster('usunięto rezerwację', 'success');
        console.log(res_id);
        console.log(res);
        this.router.navigateByUrl('/home');
    }, err => {
      this.toasterService.showToaster('wystąpił błąd', 'error');
      console.log(err);
    });
  }

  get res_id(){
    return this.ResFormGroup.get('res_id') as FormControl;
  }

  get res_status_id(){
    return this.StatusFormGroup.get('res_status_id') as FormControl;
  }

  get payment_id(){
    return this.PaymentFormGroup.get('payment_id') as FormControl;
  }

  get payment_status_id(){
    return this.PaymentFormGroup.get('payment_status_id') as FormControl;
  }

}
