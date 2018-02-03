import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../public/login/login.component';
import { RegisterComponent } from '../../public/register/register.component';
import { LoginRedirect } from '../../guards/login-redirect.service';
import { TestComponent } from '../../public/test/test.component';



export const PUBLIC_ROUTES: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    //{ path: 'test', component: TestComponent },
];

/**
*  TODO:
*  - nie odpala się czasem przez canActivate: [LoginRedirect]
*  - wywalenie naprawia błąd
*/
