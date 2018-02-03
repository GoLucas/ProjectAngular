import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cottage } from './models/Cottage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class CottageDataService {
  private cottageObs = new BehaviorSubject<Cottage>(null);
  constructor(private http: HttpClient) {}

  httpGetCottage(data: any) {
    const API_URL = `http://api.cottage.test/api/cottage/${data.id}/${data.start}/${data.end}`;

    this.http
      .get<Cottage>(API_URL,{
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(
        result => {
          this.cottageObs.next(result);
        },
        err => {
          console.log(err);
        }
      );
  }

  getCottage(): Observable<Cottage> {
    return this.cottageObs.asObservable();
  }
}
