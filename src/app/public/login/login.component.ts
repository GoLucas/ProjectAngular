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
import { MatSnackBar } from '@angular/material';
import decode from 'jwt-decode';
//import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class LoginComponent {
 // user: User = new User();
  public userForm: FormGroup;
  public error = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    public snackBar: MatSnackBar,
    //private location: Location,
    fb: FormBuilder
  ) {
    this.userForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
    });

  }

  OnInit() {
    // reset login status
    this.auth.logout();
}


//w html musi być sprawdona czy email nie m nulla po przez - '?' (email.errors?.emailExist)
get email(){
  return this.userForm.get('email') as FormControl;
}

get password(){
  return this.userForm.get('password') as FormControl;
}


  // onLogin(): void {
  //   console.log(this.userForm.value);
  //   this.auth.login(this.userForm.value);
  //   this.router.navigateByUrl('/home');
  // }


  onLogin() {
    // console.log(this.location.path() + this.location.isCurrentPathEqualTo('/login'));
    // console.log(this.router.url);

    this.auth.login(this.userForm.value)
        .subscribe(result => {
            if (result === true) {
                this.snackBar.open('Logged in succesfully', ' ' , {
                duration : 2000,
                panelClass: ['snack-bar-message', 'snack-bar-success'],
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              // const token = localStorage.getItem('token');
              // const tokenPayload = decode(token);
              // if (tokenPayload.role === 'admin') {
              //   this.router.navigateByUrl('homeadmin');
              // }else {
              //   this.router.navigateByUrl('home');
              // }
              this.router.navigateByUrl('home');
            }
            this.error = false;
        }, err => {
          this.snackBar.open('Login failed', ' ' , {
            duration : 2000,
            panelClass: ['snack-bar-message', 'snack-bar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.error = true;
          console.log(err);
        });
  }



}
