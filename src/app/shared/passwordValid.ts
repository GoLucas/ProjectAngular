import { Http } from '@angular/http';
import { AbstractControl, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class PasswordValid {
  static http: any;
  constructor(private http: HttpClient) {}

  validPassword(pass: string): Observable<any> {
  const API_URL = 'http://api.cottage.test/api/checkpass';
  return this.http.get(`${API_URL}?userPass=${pass}`, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
}

validEmail(pass: string): Observable<any> {
  const API_URL = 'http://api.cottage.test/api/checkemail';
  return this.http.get(`${API_URL}?userEmail=${pass}`, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
}

  checkPassword(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.validPassword(control.value).map(
      users => {
        return (!users) ? {'badPass': true} : null;
      }
    );
  };
}

checkMail(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.validEmail(control.value).map(
      users => {
        return (users) ? {'emailExist': true} : null;
      }
    );
  };
}
  // static unique(control: FormControl) {

  //   return new Promise(resolve => {

  //   const userPass = control.value;
  //   const API_URL = 'http://api.cottage.test/api/checkpass';

  //   return this.http.get(`${API_URL}?userPass=${userPass}`, {
  //       headers: new HttpHeaders().set('Content-Type', 'application/json'),
  //     }).subscribe(res => {
  //           if ( res === true) {
  //             resolve({'badPass': true});
  //             console.log('resolve badPass' + res);
  //           }else {
  //             resolve(null);
  //           console.log(' resolve null' );
  //           }
  //         }
  //     );
  //   });
  // }


}
