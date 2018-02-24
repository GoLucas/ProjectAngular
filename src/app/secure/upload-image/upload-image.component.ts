import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';
import { ToasterService } from '../../shared/toaster.service';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @ViewChild('inputFile')
  myInputVariable: any;

  formDoc: FormGroup;
  fileToUpload: File = null;
  disabled = true;
  public API_URL = 'http://api.cottage.test/api/uploadimage';
  public API_URL2 = 'http://api.cottage.test/api/photos/';
  public selectedFiles;
  public _cottaheId: number;
  constructor(
    private http: HttpClient,
     private _fb: FormBuilder,
     private toasterService: ToasterService) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}


  ngOnInit() {
  }
  onSubmit() {
    if (this.fileToUpload) {
      this.postFile(this.fileToUpload);
      this.myInputVariable.nativeElement.value = '';
    }
  }

  delete() {
    this.http.delete(this.API_URL2 + this._cottaheId).subscribe( res => {
      console.log(res);
      this.toasterService.showToaster('usunięto zdjęcia', 'success', 3000);
    });
  }

  postFile(fileToUpload: File) {
    const endpoint = this.API_URL;
    const formData: FormData = new FormData();
    formData.append('Cottage_photo', fileToUpload, fileToUpload.name);
    formData.append('id', this._cottaheId.toString());
    this.http.post(endpoint, formData).subscribe( res => {
      console.log(res);
      this.toasterService.showToaster('wysłano zdjęcie', 'success', 3000);
    });
}


@Input()
set cottageId(value: number) {
  this._cottaheId = value;
}
get cottageId(): number {
  return this._cottaheId;
}

}






