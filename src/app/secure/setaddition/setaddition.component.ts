import { Component, OnInit, Input } from '@angular/core';
import { AllAdditions } from '../../shared/Alladditions';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Addition } from '../../shared/models/Addition';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import 'rxjs/add/operator/map';
import { ToasterService } from '../../shared/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';

interface ErrorRes {
  error: boolean;
  message: string;
}

@Component({
  selector: 'app-setaddition',
  templateUrl: './setaddition.component.html',
  styleUrls: ['./setaddition.component.scss'],
  providers: [AllAdditions]
})
export class SetadditionComponent implements OnInit {
  public items2: Addition[];
  name: string;
  checkboxGroup: FormGroup;
  checkboxArray = new FormArray([]);
  form: FormGroup;
  private _cottaheId: number;

  constructor(
    private additionsService: AllAdditions,
    public fb: FormBuilder,
    private toasterService: ToasterService
  ) {}

  @Input()
  set cottageId(value: number) {
    this._cottaheId = value;
    this.doSomething(this._cottaheId);
  }
  get cottageId(): number {
    return this._cottaheId;
  }

  doSomething(cottage_id: number) {
    this.form = new FormGroup({
      checkboxes: new FormGroup({}),
      cottage_id: new FormControl(cottage_id)
    });

    this.additionsService.checkAdditions(cottage_id).subscribe(data => {
      this.items2 = data;
      this.items2.forEach(item => {

        if (this.form.get('checkboxes') instanceof FormGroup){
          (<FormGroup>this.form.get('checkboxes')).addControl(item.control, new FormControl(item.selected));
        }

        //this.form.get('checkboxes').addControl(item.control, new FormControl(item.selected));
      });
    });
  }

  ngOnInit() {}

  send() {
    console.log(this.form.value);
    this.additionsService.postAdditions(this.form.value).subscribe(
      (data: ErrorRes) => {
        console.log(data);
        this.toasterService.showToaster(data.message, 'success', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster(
          'Error occurred. Details: ' + err.name + ' ' + err.message,
          'error',
          8000
        );
      }
    );
  }
}
