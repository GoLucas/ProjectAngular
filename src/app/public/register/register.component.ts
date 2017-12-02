import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = new User();
  constructor(private router: Router, private auth: AuthService) {}
  onRegister(): void {
    console.log(this.user);
    this.auth.register(this.user);
    // console.log(user.json());
    // localStorage.setItem('token', user.json().auth_token);
    // localStorage.setItem('user_id', user.json().user_id);
    // localStorage.setItem('user_name', user.json().user_name);
    // localStorage.setItem('user_email', user.json().user_email);
    // console.log(localStorage.getItem('user_name'));
    this.router.navigateByUrl('/');
  }
}
