import { Component } from '@angular/core';

// import { Http, Response } from '@angular/http';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {

  }

}
