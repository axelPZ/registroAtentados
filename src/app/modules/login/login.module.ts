import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { LayoutLoginComponent } from './layout-login/layout-login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { EnviarRegistroComponent } from './enviar-registro/enviar-registro.component';
import { RegistroDireccionComponent } from './registro-direccion/registro-direccion.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RequestPasswordComponent,
    LayoutLoginComponent,
    RegistrarComponent,
    EnviarRegistroComponent,
    RegistroDireccionComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule
   
  ]
})
export class LoginModule { }
