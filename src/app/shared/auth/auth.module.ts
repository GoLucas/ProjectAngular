import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { MaterialModule } from '../../material/material.module';
import { LoginComponent } from '../../public/login/login.component';
import { RegisterComponent } from '../../public/register/register.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
