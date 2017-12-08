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



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User();
  public userForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    fb: FormBuilder
  ) {
    this.userForm = fb.group({
      email: [null, Validators.required, EmailAvailable.unique.bind(this)],
      password: [null, Validators.required, Validators.minLength(3), Validators.maxLength(16)]
    });

  }


  // wyslij() {
  //   const API_URL = 'http://localhost:80/Project-API/public/api/checkemail';
  //   const userEmail = 'user@user.pl';
  //       this.http.get(`${API_URL}?userEmail=${userEmail}`, {
  //           headers: new HttpHeaders().set('Content-Type', 'application/json')
  //           })
  //         .subscribe(res => {
  //           if (res === true) {
  //             console.log('resolve emailExist : true');
  //           }
  //           else() {
  //             console.log(' resolve: null');
  //           }
  //         });
  // }

  OnInit() {
  }

  send(){
    console.log(this.userForm);
  }

//w html musi być sprawdona czy email nie m nulla po przez - '?' (email.errors?.emailExist)
get email(){
  return this.userForm.get('email') as FormControl;
}

get password(){
  return this.userForm.get('password') as FormControl;
}


  onLogin(): void {
    this.auth.login(this.user);
    this.router.navigateByUrl('/home');
    console.log(this.user);
  }

}
