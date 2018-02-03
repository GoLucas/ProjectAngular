import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Cottage } from '../../shared/models/Cottage';
import { CottageDataService } from '../../shared/cottageData.service';
import {ReservstionPostService} from '../../shared/reservationPost.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cottage-detail',
  templateUrl: './cottage-detail.component.html',
  styleUrls: ['./cottage-detail.component.scss'],
  providers: [CottageDataService, ReservstionPostService]
})
export class CottageDetailComponent implements OnInit, OnDestroy {
  id: number;
  startDate: Date;
  endDate: Date;
  private sub: any;
  public Cottage$: Observable<Cottage>;
  public reqdate: any;
  public reqres: any;
  public start: any;
  public end: any;
  public chips = ['', 'primary', 'accent', 'warn'];
  public formatedDateStart: any;
  public formatedDateEnd: any;
  public diffDays: any;
  constructor(private route: ActivatedRoute,
    private cottageData: CottageDataService,
    private reservation: ReservstionPostService,
    public snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.startDate = params['start'];
       this.endDate = params['end'];

       this.reqdate  = {
        id: this.id,
        start: this.startDate,
        end : this.endDate
      };
      this.cottageData.httpGetCottage(this.reqdate);
      this.Cottage$ = this.cottageData.getCottage();
      this.Cottage$.subscribe(res => { console.log(res); });

        this.start = moment.unix(params['start']);
        this.end = moment.unix(params['end']);

        this.formatedDateStart = moment.unix(params['start']).format('DD/MM/YYYY');
        this.formatedDateEnd = moment.unix(params['end']).format('DD/MM/YYYY');
        if(this.end.diff(this.start, 'days') === 0){
          this.diffDays = this.end.diff(this.start, 'days') + 1;
        }else {
          this.diffDays = this.end.diff(this.start, 'days');
        }
        this.reqres  = {
          cottage_id: this.id,
          start: this.start.format('X'),
          end : this.end.format('X')
        };

      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getReservation() {
    console.log(this.reqres);
    this.reservation.httpPostReservation(this.reqres).subscribe(res => {

        this.snackBar.open('Dokonano rezerwacji pomyslnie', ' ' , {
        duration : 3000,
        panelClass: ['snack-bar-message', 'snack-bar-success'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.router.navigateByUrl('home');
      console.log(res);
    },
  err => {
    this.snackBar.open('Błąd w rezerwacji', ' ' , {
      duration : 3000,
      panelClass: ['snack-bar-message', 'snack-bar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    console.log(err);
  });
    //TODO: post na server z rezerwacją start, end i id domku
  }

// getCottage() {
//   this.reqdate  = {
//     id: this.id,
//     start: this.startDate,
//     end : this.endDate
//   };

//   this.cottageData.httpGetCottage(this.reqdate);
//   this.Cottage$ = this.cottageData.getCottage();
//   this.Cottage$.subscribe(res => { console.log(res); });
// }


}
