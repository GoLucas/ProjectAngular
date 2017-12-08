import { HomeComponent } from './../../secure/home';
import { Routes, RouterModule } from '@angular/router';
import { EnsureAuthenticated } from '../../guards/ensure-authenticated.service';
import { HomeadminComponent } from '../../secure/homeadmin/index';
import { EnsureAuthenticatedAdmin } from '../../guards/ensure-authenticated-admin.service';


export const SECURE_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
    { path: 'homeadmin', component: HomeadminComponent, canActivate: [EnsureAuthenticatedAdmin] },
];
