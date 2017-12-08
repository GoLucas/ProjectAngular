import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

}
