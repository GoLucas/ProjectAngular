import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class LoginRedirect implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      console.log('LoginRedirect true');
      return true;
    }else {
      console.log('LoginRedirect false');
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
