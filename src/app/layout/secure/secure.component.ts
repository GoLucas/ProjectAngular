import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/auth/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  userName: string;
  id : string;
  constructor(private router: Router, public snackBar: MatSnackBar, public auth: AuthService) {
    this.isLoggedIn = auth.isLoggedIn();
   }

  ngOnInit() {
    this.userName = localStorage.getItem('email');
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout() {
    // this.router.navigateByUrl('');
    // localStorage.removeItem('token');
    // localStorage.removeItem('user_id');
    this.auth.logout();
    this.snackBar.open('Logged out', ' ' , {
      duration : 2000,
      panelClass: ['snack-bar-message', 'snack-bar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }



  userReservations() {
    this.router.navigate(['/products'], { queryParams: { order: 'popular' } });
  }

}

/**
 * zeby mozna było zmieniac aktywne linki
This is what I use

<li [class.active]="isActive('/Dashboard')">
       <a [router-link]="['/Dashboard']" class="link">Dashboard</a>
</li>
This adds the 'active' class to the active link and removes it from any others.

isActive (path) {
    return this.location.path().indexOf(path) > -1;
}
*/
