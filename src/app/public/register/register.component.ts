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

    this.router.navigateByUrl('/');
  }
}
