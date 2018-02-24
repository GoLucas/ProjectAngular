import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface Newsletter {
  error: boolean;
  message: string;
}

@Injectable()
export class NewsletterService {

  constructor(private http: HttpClient) { }
  public API_URL = 'http://api.cottage.test/api/newsletter';

  httpPostNewsletter(data: any): Observable<any> {
    console.log('serwis działa');
    return this.http.post(this.API_URL, data);
  }

}
