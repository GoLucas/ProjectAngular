import { NgModule } from '@angular/core';

import { EnsureAuthenticated } from './ensure-authenticated.service';
import { LoginRedirect } from './login-redirect.service';

@NgModule({
  providers: [
    EnsureAuthenticated,
    LoginRedirect
  ]
})
export class GuardsModule { }
