import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cottage } from './models/Cottage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AllCottagesService {
  private cottageObs = new BehaviorSubject<Cottage>(null);
  constructor(private http: HttpClient) {}

  httpGetCottages() {
    const API_URL = `http://api.cottage.test/api/cottages`;

    this.http
      .get<Cottage>(API_URL)
      .subscribe(
        result => {
          this.cottageObs.next(result);
        },
        err => {
          console.log(err);
        }
      );
  }

  getCottages(): Observable<Cottage> {
    return this.cottageObs.asObservable();
  }
}
