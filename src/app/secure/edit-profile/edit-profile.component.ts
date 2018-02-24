import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../shared/current-user.service';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DisableControlDirective } from '../../shared/disable-control.directive';
import { PasswordValid } from '../../shared/passwordValid';
import { EmailAvailable } from '../../shared/emailAvailable';
import { EditProfile } from '../../shared/edit-profile';
import { ToasterService } from '../../shared/toaster.service';
import { CustomValidators } from '../../shared/custom-validators';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [CurrentUserService, PasswordValid, EditProfile]
})
export class EditProfileComponent implements OnInit {
  user: User;
  disabled = true;
  public editProfileForm: FormGroup;
  public changePasswordForm: FormGroup;

  constructor(
    private editProfileService: EditProfile,
    private userService: CurrentUserService,
    public toasterService: ToasterService,
    fb: FormBuilder,
    pw: PasswordValid) {
      this.editProfileForm = fb.group({
        // email: [{value: null, disabled: true}, [Validators.required, Validators.email] , pw.checkMail()],
        first_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        last_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        street: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        postal_code: [null, [Validators.required, Validators.pattern('[0-9]{2}\-[0-9]{3}')]],
        phone: [null, [Validators.required, Validators.pattern('^\\d{9}$')]],
      });

      this.changePasswordForm = fb.group({
        password: [null, [Validators.minLength(1), Validators.maxLength(444)], pw.checkPassword()],
        new_password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        confirm_password: [null, Validators.required], referral_code: null},
        {
          validator: CustomValidators.Match('new_password', 'confirm_password')
        });
  }


  changePassword() {
    this.editProfileService.postChangePassword(this.changePasswordForm.value).subscribe( res => {
      if (res.error === false) {
        this.toasterService.showToaster(res.message, 'success');
      }else if (res.error === true) {
        this.toasterService.showToaster(res.message, 'error');
      }
    });
    console.log(this.changePasswordForm.value);
  }

  changeProfile() {
    this.editProfileService.postEditProfile(this.editProfileForm.value).subscribe( res => {
      if (res.error === false) {
        this.toasterService.showToaster(res.message, 'success');
      }else if (res.error === true) {
        this.toasterService.showToaster(res.message, 'error');
      }
    });
    console.log(this.editProfileForm.value);
    }

//   disableInput(): void {
//     this.disabled = true;
//  }
//  // enable input box
//  enableInput(): void {
//     this.disabled = false;
//  }

//  Swap(event) {
//    if (event.checked === true) {
//     this.editProfileForm.controls['email'].enable();
//    }else {
//     this.editProfileForm.controls['email'].disable();
//    }

//  }

  ngOnInit() {
    this.userService.httpGetCurrentUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
      this.editProfileForm.controls['first_name'].setValue(this.user.first_name);
      this.editProfileForm.controls['last_name'].setValue(this.user.last_name);
      this.editProfileForm.controls['street'].setValue(this.user.street);
      this.editProfileForm.controls['city'].setValue(this.user.city);
      this.editProfileForm.controls['postal_code'].setValue(this.user.postal_code);
      this.editProfileForm.controls['phone'].setValue(this.user.phone);

    });

  }


  get email(){
    return this.editProfileForm.get('email') as FormControl;
  }
  get first_name(){
    return this.editProfileForm.get('first_name') as FormControl;
  }
  get last_name(){
    return this.editProfileForm.get('last_name') as FormControl;
  }
  get street(){
    return this.editProfileForm.get('street') as FormControl;
  }
  get city(){
    return this.editProfileForm.get('city') as FormControl;
  }
  get postal_code(){
    return this.editProfileForm.get('postal_code') as FormControl;
  }
  get phone(){
    return this.editProfileForm.get('phone') as FormControl;
  }

  get password(){
    return this.changePasswordForm.get('password') as FormControl;
  }
  get new_password(){
    return this.changePasswordForm.get('new_password') as FormControl;
  }
  get confirm_password(){
    return this.changePasswordForm.get('confirm_password') as FormControl;
  }
}
