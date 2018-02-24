import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { DatesAvailable } from '../../shared/datesAvailable';
import { CottageRes } from '../../shared/models/CottageRes';
import { Observable } from 'rxjs/Observable';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
// import * as _moment from 'moment';
// import {default as _rollupMoment } from 'moment';

// const moment = _rollupMoment || _moment;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [DatesAvailable],
})
export class ReservationComponent implements OnInit {

public dateForm: FormGroup;
public minDate = moment();
public maxDate = moment('2019-03-31');

public resdate: any;
public allCottages$: Observable<Array<CottageRes>>;
public errData = false;

matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private dates: DatesAvailable) {
    this.dateForm = this.fb.group({
      dateStart: [''],
      dateEnd: ['']
    }, { validator: [this.checkDates, Validators.required] });
    //   this.dateForm = this.fb.group({
    //   dateStart : [null, [Validators.required, this.checkDates]],
    //   dateEnd : [null, [Validators.required, this.checkDates]]
    // });
  }

   checkDates(group: FormGroup) {
    if (group.controls.dateEnd.value < group.controls.dateStart.value) {
      return { endDateLessThanStartDate: true };
    }
    return null;
  }

  ngOnInit() { }

  check() {
    this.resdate  = {
      start: this.dateForm.get('dateStart').value.unix(),
      end : this.dateForm.get('dateEnd').value.unix()
    };
    this.dates.checkDates(this.resdate);
    this.allCottages$ = this.dates.getListOfCottages();
    this.allCottages$.subscribe(res => {

      if (res.length > 0) {
        this.errData = false;
      }else {
        this.errData = true;
      }
    });
  }
}
