import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { JwtModule} from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuardsModule } from './guards/guards.module';
import { MaterialModule } from './material/material.module';

// Layout
import { SecureComponent } from './layout/secure';
import { PublicComponent } from './layout/public/public.component';

// Secure Component
import { HomeComponent } from './secure/home/home.component';
// Public Component
// import { LoginComponent } from './public/login';

import { EnsureAuthenticated } from './guards/ensure-authenticated.service';
import { LoginRedirect } from './guards/login-redirect.service';
import { AuthService } from './shared/auth/auth.service';
import { LoginComponent } from './public/login/login.component';
import { HomeadminComponent } from './secure/homeadmin/homeadmin.component';
import { EnsureAuthenticatedAdmin } from './guards/ensure-authenticated-admin.service';
import { RegisterComponent } from './public/register/register.component';
import { ReservationComponent } from './secure/reservation/reservation.component';
import {MatNativeDateModule} from '@angular/material';
import { CottageDetailComponent } from './secure/cottage-detail/cottage-detail.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { ReservationViewComponent } from './secure/reservation-view/reservation-view.component';
import { CalendarComponent } from './secure/calendar/calendar.component';
import { PaymentsComponent } from './secure/payments/payments.component';




@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    HomeComponent,
    LoginComponent,
    SecureComponent,
    HomeadminComponent,
    RegisterComponent,
    ReservationComponent,
    CottageDetailComponent,
    ReservationViewComponent,
    CalendarComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GuardsModule,
    MatNativeDateModule,
    MatMomentDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['api.cottage.test'] // bez http:// bo sie zjebało
      }
    }),
  ],
  providers: [
     AuthService,
     EnsureAuthenticated,
     EnsureAuthenticatedAdmin,
     LoginRedirect,
  ],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AppModule { }
