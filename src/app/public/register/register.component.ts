import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { EmailAvailable } from '../../shared/emailAvailable';
import { MatSnackBar } from '@angular/material';
import {ToasterService } from '../../shared/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  //public error = false;

    constructor(
      private http: HttpClient,
      private router: Router,
      private auth: AuthService,
      public toasterService: ToasterService,
      fb: FormBuilder
    ) {
      this.registerForm = fb.group({
        email: [null, [Validators.required, Validators.email] , EmailAvailable.unique.bind(this)],
        first_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        last_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        street: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        postal_code: [null, [Validators.required, Validators.pattern('[0-9]{2}\-[0-9]{3}')]],
        phone: [null, [Validators.required, Validators.pattern('^\\d{9}$')]],
        password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
      });
    }


    show() {
      console.log(this.registerForm.value);
    }
  // w html musi być sprawdona czy email nie m nulla po przez - '?' (email.errors?.emailExist)
  get email(){
    return this.registerForm.get('email') as FormControl;
  }
  get first_name(){
    return this.registerForm.get('first_name') as FormControl;
  }
  get last_name(){
    return this.registerForm.get('last_name') as FormControl;
  }
  get street(){
    return this.registerForm.get('street') as FormControl;
  }
  get city(){
    return this.registerForm.get('city') as FormControl;
  }
  get postal_code(){
    return this.registerForm.get('postal_code') as FormControl;
  }
  get phone(){
    return this.registerForm.get('phone') as FormControl;
  }
  get password(){
    return this.registerForm.get('password') as FormControl;
  }

/**
* TODO:
* - odseparować snackbar poza onRegister na pdstawie zmiennej error
*/
onRegister(): void {
    console.log('Formularz: ' + this.registerForm.value);
    this.auth.register(this.registerForm.value).subscribe(result => {
      if (result === true) {
        this.toasterService.showToaster('zarejestrowano pomylnie', 'success');
        this.router.navigateByUrl('/login');
      }
      //this.error = false;
  }, err => {
    this.toasterService.showToaster('wystąpił błąd', 'error');
    //this.error = true;
  });

  }
}
