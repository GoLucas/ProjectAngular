import { HomeComponent } from './../../secure/home';
import { Routes, RouterModule } from '@angular/router';
import { EnsureAuthenticated } from '../../guards/ensure-authenticated.service';


export const SECURE_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
];
