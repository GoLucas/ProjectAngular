import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrentUserService {
  private userObs = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { }
  public API_URL = 'http://api.cottage.test/api/userdata';

  httpGetCurrentUser() {
    return this.http.get<User>(this.API_URL);
    // .subscribe(
    //   res => {
    //     this.userObs.next(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }


  // getUser(): Observable<User> {
  //   return this.userObs.asObservable();
  // }
}
