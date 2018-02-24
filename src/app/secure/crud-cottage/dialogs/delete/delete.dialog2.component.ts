import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {Data2Service} from '../../services/data2.service';


@Component({
  selector: 'app-delete2.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog2.html',
  styleUrls: ['../../dialogs/delete/delete.dialog2.css']
})
export class DeleteDialog2Component {

  constructor(public dialogRef: MatDialogRef<DeleteDialog2Component>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: Data2Service) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
  }
}
