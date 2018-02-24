import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ExtraPaymentService } from '../../shared/extra-payment.service';
import { ExtraPayment } from '../../shared/models/ExtraPayment';
import { Reservation } from '../../shared/models/Reservation';
import { ToasterService } from '../../shared/toaster.service';
import { UserReservationsService } from '../../shared/user-reservations.service';

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.scss'],
  providers: [ExtraPaymentService, UserReservationsService]
})
export class OrderServiceComponent implements OnInit {
  extraPaymentForm: FormGroup;
  firstFormGroup: FormGroup;
  public Service$: Observable<ExtraPayment>;
  public chosenOption: string;
  public service_id: number;
  public id: any;
  public resObs$: Observable<Reservation[]>;
  private reservationObs = new BehaviorSubject<Reservation[]>(null);

  constructor(private _formBuilder: FormBuilder,
     private extraPayment: ExtraPaymentService,
     private reservationsData: UserReservationsService,
     public snackBar: MatSnackBar,
     private router: Router,
     public toasterService: ToasterService) {}

  ngOnInit() {
    this.extraPayment.checkServices();
    this.Service$ = this.extraPayment.getListOfServices();

    // rezerwacje
    const token = decode(localStorage.getItem('token'));
    this.id = token.user_id;
    this.reservationsData.httpGetReservations(this.id).subscribe(res => {
    this.reservationObs.next(res);
    });
    this.resObs$ = this.reservationObs.asObservable();
    // rezerwacje
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });

    this.extraPaymentForm = this._formBuilder.group({
      count: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      serviceId: [],
      resId: []
    });



  }

  onSubmit() {
    console.log(this.extraPaymentForm.value);
    this.extraPaymentForm.controls['serviceId'].setValue(this.firstFormGroup.get('firstCtrl').value);
    this.extraPaymentForm.controls['resId'].setValue(this.firstFormGroup.get('secondCtrl').value);
    this.extraPayment.postExtraPayments(this.extraPaymentForm.value).subscribe(res => {

      this.toasterService.showToaster('Zamwienie przyjęte', 'info');
      this.router.navigateByUrl('/payments');

      console.log(res);
    }, err => {
      this.toasterService.showToaster('nie można przyjąć zamwienia', 'error');

      console.log(err);
    });



  }

}
