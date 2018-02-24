import { HomeComponent } from './../../secure/home';
import { Routes, RouterModule } from '@angular/router';
import { EnsureAuthenticated } from '../../guards/ensure-authenticated.service';
import { HomeadminComponent } from '../../secure/homeadmin/index';
import { EnsureAuthenticatedAdmin } from '../../guards/ensure-authenticated-admin.service';
import { ReservationComponent } from '../../secure/reservation/reservation.component';
import { CottageDetailComponent } from '../../secure/cottage-detail/cottage-detail.component';
import { ReservationViewComponent } from '../../secure/reservation-view/reservation-view.component';
import { PaymentsComponent } from '../../secure/payments/payments.component';
import { OrderServiceComponent } from '../../secure/order-service/order-service.component';
import { StatusComponent } from '../../secure/status/status.component';
import { TicketsComponent } from '../../secure/tickets/tickets.component';
import { HandleTicketComponent } from '../../secure/handle-ticket/handle-ticket.component';
import { NewsletterComponent } from '../../secure/newsletter/newsletter.component';
import { EditProfileComponent } from '../../secure/edit-profile/edit-profile.component';
import { CrudCottageComponent } from '../../secure/crud-cottage/crud-cottage.component';
import { ManageGoogleMapsComponent } from '../../secure/manage-google-maps/manage-google-maps.component';


export const SECURE_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
    { path: 'homeadmin', component: HomeadminComponent, canActivate: [EnsureAuthenticatedAdmin], data: {expectedRole: 'admin'}},
    { path: 'reservation', component: ReservationComponent, canActivate: [EnsureAuthenticated] },
    { path: 'cottage-details/:id/:start/:end', component: CottageDetailComponent, canActivate: [EnsureAuthenticated] },
    { path: 'reservation-view', component: ReservationViewComponent, canActivate: [EnsureAuthenticated] },
    { path: 'payments', component: PaymentsComponent, canActivate: [EnsureAuthenticated] },
    { path: 'tickets', component: TicketsComponent, canActivate: [EnsureAuthenticated] },
    { path: 'order-service', component: OrderServiceComponent, canActivate: [EnsureAuthenticated] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [EnsureAuthenticated] },
    { path: 'status', component: StatusComponent,
     canActivate: [EnsureAuthenticated, EnsureAuthenticatedAdmin], data: {expectedRole: 'admin'} },
    { path: 'handle-ticket', component: HandleTicketComponent,
     canActivate: [EnsureAuthenticated, EnsureAuthenticatedAdmin], data: {expectedRole: 'admin'} },
    { path: 'newsletter', component: NewsletterComponent,
     canActivate: [EnsureAuthenticated, EnsureAuthenticatedAdmin], data: {expectedRole: 'admin'} },
    { path: 'edit_cottage', component: CrudCottageComponent,
     canActivate: [EnsureAuthenticated, EnsureAuthenticatedAdmin], data: {expectedRole: 'admin'} },
     { path: 'manage_maps', component: ManageGoogleMapsComponent,
     canActivate: [EnsureAuthenticated, EnsureAuthenticatedAdmin], data: {expectedRole: 'admin'} }

];

