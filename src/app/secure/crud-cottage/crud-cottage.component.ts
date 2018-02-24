import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Data2Service } from './services/data2.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddDialog2Component} from './dialogs/add/add.dialog2.component';
import {EditDialog2Component} from './dialogs/edit/edit.dialog2.component';
import {DeleteDialog2Component} from './dialogs/delete/delete.dialog2.component';
import { ToasterService } from '../../shared/toaster.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Addition } from '../../shared/models/Addition';
import { AllAdditions } from '../../shared/Alladditions';
import { CottageRes } from '../../shared/models/CottageRes';
import { Cottage } from './models/cottage';

@Component({
  selector: 'app-cottage-crud',
  templateUrl: 'crud-cottage.component.html',
  styleUrls: ['./crud-cottage.component.scss'],
  providers: [AllAdditions]
})
export class CrudCottageComponent implements OnInit {
  additionFormGroup: FormGroup;
  displayedColumns = ['id', 'name', 'capacity', 'description', 'base_price', 'actions'];
  exampleDatabase: Data2Service | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  cottage_id: number;
  cottage_id2: number;
  public Cottage$: Observable<CottageRes>;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              private toasterService: ToasterService,
              public dataService: Data2Service,
              private additionsService: AllAdditions,
              private formBuilder: FormBuilder) {
              }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  tabChange(event) {
    if ( event.index === 1 || event.index === 2) {
    this.additionsService.httpAllCottages();
    this.Cottage$ = this.additionsService.getAllCottages();
    }
  }

  onChange(event) {
  console.log(event.value);
  this.cottage_id = event.value;
}

onChange2(event) {
  console.log(event.value);
  this.cottage_id2 = event.value;
}

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(Cottage: Cottage) {
    const dialogRef = this.dialog.open(AddDialog2Component, {
      data: {Cottage: Cottage }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        console.log('refresh');
        this.refresh();
      }
    });

  }

  startEdit(i: number, id: number,
     name: string, capacity: number,
      description: string, base_price: number) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialog2Component, {
      data: {id: id, name: name,
         capacity: capacity, description: description,
           base_price: base_price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, name: string, capacity: number, description: string, base_price: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialog2Component, {
      data: {id: id, name: name, capacity: capacity, description: description, base_price: base_price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new Data2Service(this.httpClient, this.toasterService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }



}




export class ExampleDataSource extends DataSource<Cottage> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Cottage[] = [];
  renderedData: Cottage[] = [];

  constructor(public _exampleDatabase: Data2Service,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Cottage[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((Cottage: Cottage) => {
        const searchStr = (Cottage.id + Cottage.name + Cottage.description).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }



  /** Returns a sorted copy of the database data. */
  sortData(data: Cottage[]): Cottage[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'capacity': [propertyA, propertyB] = [a.capacity, b.capacity]; break;
        case 'base_price': [propertyA, propertyB] = [a.base_price, b.base_price]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
