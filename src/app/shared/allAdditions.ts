import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExtraPayment } from './models/ExtraPayment';
import { Addition } from './models/Addition';
import { Cottage } from '../secure/crud-cottage/models/cottage';
@Injectable()
export class AllAdditions {
  public API_URL = 'http://api.cottage.test/api/cottage/additions/';
  public API_URL2 = 'http://api.cottage.test/api/changeadditions';
  public API_URL3 = 'http://api.cottage.test/api/cottages';
  private serviceListObs = new BehaviorSubject<Array<Addition>>(null);
  private cottagesObs = new BehaviorSubject<Cottage>(null);
  constructor(private http: HttpClient) {}

  checkAdditions(id: any) {
    return this.http.get<Addition[]>(this.API_URL + id);
      // .subscribe(
      //   result => {
      //     this.serviceListObs.next(result);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
  }
  // getListOfAdditions(): Observable<Array<Addition>> {
  //   return this.serviceListObs.asObservable();
  // }



  postAdditions(checkbox: any): Observable<any> {
      return this.http.post(this.API_URL2, checkbox);
  }

  httpAllCottages() {
    this.http.get<Cottage>(this.API_URL3)
          .subscribe(
        result => {
          this.cottagesObs.next(result);
        },
        err => {
          console.log(err);
        }
      );
  }

  getAllCottages(): Observable<Cottage> {
    return this.cottagesObs.asObservable();
  }
}
