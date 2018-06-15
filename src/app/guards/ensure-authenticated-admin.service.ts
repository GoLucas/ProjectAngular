import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import decode from 'jwt-decode';

@Injectable()
export class EnsureAuthenticatedAdmin implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
      const expectedRole = route.data.expectedRole;
      const token = localStorage.getItem('token');
      const admin = localStorage.getItem('admin');
      if (!localStorage.getItem('token') || admin !== expectedRole) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
    }
/**
*  TODO:
*  - implementacja autentykacji admina pobranego jakos z tokena z local storage
*  - tymczasowo token
*/
  //   if (localStorage.getItem('token')) {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }
}
