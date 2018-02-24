import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cottage } from '../../shared/models/Cottage';
import { AllCottagesService } from '../../shared/all-cotages.service';

@Component({
  selector: 'app-cottage-view',
  templateUrl: './cottage-view.component.html',
  styleUrls: ['./cottage-view.component.scss'],
  providers: [AllCottagesService]
})
export class CottageViewComponent implements OnInit {
  public allCottages$: Observable<Cottage>;
  constructor(private cottagesService: AllCottagesService) { }

  ngOnInit() {
    this.cottagesService.httpGetCottages();
    this.allCottages$ = this.cottagesService.getCottages();
  }

}
