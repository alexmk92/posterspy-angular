import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {SharedModule} from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './auth/google-signin.directive';
import { FacebookSigninDirective } from './auth/facebook-signin.directive';
import {ReactiveFormsModule} from '@angular/forms';
import { EmailLoginComponent } from './email-login/email-login.component';


@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective, FacebookSigninDirective, EmailLoginComponent],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
