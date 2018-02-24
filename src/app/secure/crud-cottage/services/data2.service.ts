import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cottage } from '../models/Cottage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../shared/toaster.service';

interface ErrorRes{
  error: boolean;
  message: string;
}

@Injectable()
export class Data2Service {
  private readonly API_URL = 'http://api.cottage.test/api/cottages';
  private readonly API_URL2 = 'http://api.cottage.test/api/cottage/add';
  private readonly API_URL3 = 'http://api.cottage.test/api/cottage/';
  private readonly API_URL4 = 'http://api.cottage.test/api/cottage/update';

  dataChange: BehaviorSubject<Cottage[]> = new BehaviorSubject<Cottage[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToasterService
  ) {}

  get data(): Cottage[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Cottage[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  // DEMO ONLY, you can find working methods below
  // addIssue (Cottage: Cottage): void {
  //   this.dialogData = Cottage;
  // }

  // ADD, POST METHOD
  addIssue(cottage: Cottage): void {
    console.log(cottage);
        this.dialogData = cottage;
    this.httpClient.post(this.API_URL2, cottage).subscribe(
      (data: ErrorRes) => {
        console.log('add cottage: ');
        console.log(data);
        this.dialogData = cottage;
        this.toasterService.showToaster(data.message, 'success', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster(
          'Error occurred. Details: ' + err.name + ' ' + err.message,
          'error', 8000
        );
      }
    );
  }

  // updateIssue(Cottage: Cottage): void {
  //   console.log(Cottage);
  //   this.dialogData = Cottage;
  // }

      // UPDATE, PUT METHOD
      updateIssue(Cottage: Cottage): void {
        console.log(Cottage);
        this.httpClient.post(this.API_URL4, Cottage).subscribe((data: ErrorRes) => {
              this.dialogData = Cottage;
              this.toasterService.showToaster(data.message, 'success', 3000);
          },
          (err: (HttpErrorResponse)) => {
            this.toasterService.showToaster( err.error.message, 'error', 8000);
          }
        );
      }

  // deleteIssue(id: number): void {
  //   console.log(id);
  // }

    // DELETE METHOD
    deleteIssue(id: number): void {
      console.log(id);
      this.httpClient.delete(this.API_URL3 + id).subscribe((data: ErrorRes) => {
        console.log('DELETED: ' + data);
          this.toasterService.showToaster(data.message, 'success', 3000);
        },
        (err: HttpErrorResponse) => {
          this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 'error', 8000);
        }
      );
    }
}

/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
