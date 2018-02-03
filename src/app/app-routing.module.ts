import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnsureAuthenticated } from './guards/ensure-authenticated.service';
import { SecureComponent, SECURE_ROUTES } from './layout/secure';
import { PublicComponent, PUBLIC_ROUTES } from './layout/public';

/**
 * Route constant
 */
const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '',
        component: SecureComponent,
        canActivate: [EnsureAuthenticated],
        data: { title: 'Secure Views' },
        children: SECURE_ROUTES },
    { path: '**', redirectTo: '/login' },
];

/**
 * App routing module
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
