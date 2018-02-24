import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';
import {Ticket} from '../../models/ticket';

interface Statuses {
  id: number;
  name: any;
}

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.scss']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ticket,
              public dataService: DataService) { }
Statuses = [
  {
    id: 1,
    name: 'przyjęte'
  },
  {
    id: 2,
    name: 'w trakcie'
  },
  {
    id: 3,
    name: 'rozwiązane'
  }
]

  formControl = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // public confirmAdd(): void {
  //   this.dataService.addIssue(this.data);
  //   console.log(this.data);
  // }
}
