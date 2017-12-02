import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { JwtModule} from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuardsModule } from './guards/guards.module';
// import { PagesModule } from './pages/pages.module';
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






@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    HomeComponent,
    LoginComponent,
    SecureComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    GuardsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['http://project-api.dev']
      }
    }),
  ],
  providers: [
     AuthService,
     EnsureAuthenticated,
     LoginRedirect
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
