import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewsletterService } from '../../shared/newsletter.service';
import { ToasterService } from '../../shared/toaster.service';

interface Newsletter {
  error: boolean;
  message: string;
}

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  providers: [NewsletterService]
})
export class NewsletterComponent implements OnInit, OnChanges {
  newsletterForm: FormGroup;
  showLoader: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public toasterService: ToasterService,
    public newsletterService: NewsletterService) { }

startloader() {
  this.showLoader = true;
}
endloader() {
  this.showLoader = false;
}

  ngOnInit() {
    this.newsletterForm = this.fb.group({
      subject: ['', Validators.required],
      newsletterMessage: ['', Validators.required]
    });
  }

  get subject(){
    return this.newsletterForm.get('subject') as FormControl;
  }

  get newsletterMessage(){
    return this.newsletterForm.get('newsletterMessage') as FormControl;
  }

  sendNewsletter() {
    this.startloader();
    console.log(this.newsletterForm.value);
    this.newsletterService.httpPostNewsletter(this.newsletterForm.value).subscribe( (res: Newsletter) => {
      if (res.error === false) {
        this.endloader();
        this.newsletterForm.reset();
        this.toasterService.showToaster('wysłano newsletter', 'success');
      }else if (res.error === true){
        this.toasterService.showToaster('błąd podczas wysyłania: ' + res.message, 'error');
        this.endloader();
        this.newsletterForm.reset();
      }
      console.log(res);
    }, err => {
      this.toasterService.showToaster('błąd servera', 'error');
      this.endloader();
      this.newsletterForm.reset();
      console.log(err);
    });
    console.log(this.newsletterForm.value);
  }

  ngOnChanges() {
  }

}
