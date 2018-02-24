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
import { PaymentsComponent } from './secure/payments/payments.component';
import { OrderServiceComponent } from './secure/order-service/order-service.component';
import { StatusComponent } from './secure/status/status.component';
import { TicketsComponent } from './secure/tickets/tickets.component';
import { HandleTicketComponent } from './secure/handle-ticket/handle-ticket.component';
import { AddDialogComponent } from './secure/handle-ticket/dialogs/add/add.dialog.component';
import { EditDialogComponent } from './secure/handle-ticket/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './secure/handle-ticket/dialogs/delete/delete.dialog.component';
import { DataService } from './secure/handle-ticket/services/data.service';
import { ToasterService } from './shared/toaster.service';
import { NewsletterComponent } from './secure/newsletter/newsletter.component';
import { ParticlesModule } from 'angular-particle';
import { EditProfileComponent } from './secure/edit-profile/edit-profile.component';
import { CrudCottageComponent } from './secure/crud-cottage/crud-cottage.component';

import { AddDialog2Component } from './secure/crud-cottage/dialogs/add/add.dialog2.component';
import { EditDialog2Component } from './secure/crud-cottage/dialogs/edit/edit.dialog2.component';
import { DeleteDialog2Component } from './secure/crud-cottage/dialogs/delete/delete.dialog2.component';
import { Data2Service } from './secure/crud-cottage/services/data2.service';
import { SetadditionComponent } from './secure/setaddition/setaddition.component';
import { UploadImageComponent } from './secure/upload-image/upload-image.component';
import { HomepageComponent } from './public/homepage/homepage.component';
import { ContactComponent } from './public/contact/contact.component';
import { CottageViewComponent } from './public/cottage-view/cottage-view.component';
import { AgmCoreModule } from '@agm/core';
import { ManageGoogleMapsComponent } from './secure/manage-google-maps/manage-google-maps.component';

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
    PaymentsComponent,
    OrderServiceComponent,
    StatusComponent,
    TicketsComponent,
    HandleTicketComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddDialog2Component,
    EditDialog2Component,
    DeleteDialog2Component,
    NewsletterComponent,
    EditProfileComponent,
    CrudCottageComponent,
    SetadditionComponent,
    UploadImageComponent,
    HomepageComponent,
    ContactComponent,
    CottageViewComponent,
    ManageGoogleMapsComponent,
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
    ParticlesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWVK69quUQJ258AZneNQrs2fRyvuc6F1M',
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['api.cottage.test'] // bez http:// bo sie zjebało
      }
    }),
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddDialog2Component,
    EditDialog2Component,
    DeleteDialog2Component
  ],
  providers: [
     AuthService,
     EnsureAuthenticated,
     EnsureAuthenticatedAdmin,
     LoginRedirect,
     DataService,
     Data2Service,
     ToasterService
  ],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AppModule { }
