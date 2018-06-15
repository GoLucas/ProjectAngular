import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}

