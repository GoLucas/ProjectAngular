import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {Data2Service} from '../../services/data2.service';
import {FormControl, Validators} from '@angular/forms';
import {Cottage} from '../../models/Cottage';

@Component({
  selector: 'app-add.dialog2',
  templateUrl: '../../dialogs/add/add.dialog2.html',
  styleUrls: ['../../dialogs/add/add.dialog2.css']
})

export class AddDialog2Component {
  constructor(public dialogRef: MatDialogRef<AddDialog2Component>,
              @Inject(MAT_DIALOG_DATA) public data: Cottage,
              public dataService: Data2Service) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }
}
