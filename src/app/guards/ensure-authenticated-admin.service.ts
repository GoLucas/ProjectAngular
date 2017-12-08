import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';


@Injectable()
export class EnsureAuthenticatedAdmin implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('admin') === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
