import { Router } from '@angular/router';
import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../shared/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User();

  constructor(private router: Router, private auth: AuthService) {}
  onLogin(): void {
    this.auth.login(this.user);
        // localStorage.setItem('currentUser', JSON.stringify(user.json()));
        // localStorage.setItem('token', user.json().auth_token);
        // localStorage.setItem('user_id', user.json().user_id);
        // localStorage.setItem('user_name', user.json().user_name);
        // localStorage.setItem('user_email', user.json().user_email);
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(currentUser.auth_token);
        this.router.navigateByUrl('home');
        console.log(this.user);
  }
}
