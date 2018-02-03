import { HomeComponent } from './../../secure/home';
import { Routes, RouterModule } from '@angular/router';
import { EnsureAuthenticated } from '../../guards/ensure-authenticated.service';
import { HomeadminComponent } from '../../secure/homeadmin/index';
import { EnsureAuthenticatedAdmin } from '../../guards/ensure-authenticated-admin.service';
import { ReservationComponent } from '../../secure/reservation/reservation.component';
import { CottageDetailComponent } from '../../secure/cottage-detail/cottage-detail.component';
import { ReservationViewComponent } from '../../secure/reservation-view/reservation-view.component';
import { CalendarComponent } from '../../secure/calendar/calendar.component';
import { PaymentsComponent } from '../../secure/payments/payments.component';


export const SECURE_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
    { path: 'homeadmin',
    component: HomeadminComponent,
    canActivate: [EnsureAuthenticatedAdmin],
    data: {expectedRole: 'admin'}
    },
    { path: 'reservation', component: ReservationComponent, canActivate: [EnsureAuthenticated] },
    { path: 'cottage-details/:id/:start/:end', component: CottageDetailComponent, canActivate: [EnsureAuthenticated] },
    { path: 'reservation-view', component: ReservationViewComponent, canActivate: [EnsureAuthenticated] },
    { path: 'payments', component: PaymentsComponent, canActivate: [EnsureAuthenticated] },
    { path: 'calendar', component: CalendarComponent, canActivate: [EnsureAuthenticated] },
];
