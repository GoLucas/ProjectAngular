import { Http } from '@angular/http';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class EmailAvailable {
  static http: any;
  constructor(private http: HttpClient) {}

  static unique(control: FormControl){

    return new Promise(resolve => {

    const userEmail = control.value;
    const API_URL = 'http://localhost:80/Project-API/public/api/checkemail';

    return this.http.get(`${API_URL}?userEmail=${userEmail}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(res => {
            if ( res === true) {
              resolve({'emailExist': true});
              console.log('resolve emailExist'+ res);
            }
            else {
              resolve(null);
            console.log(' resolve null' );
            }
          }
      );
    });
  }
}
