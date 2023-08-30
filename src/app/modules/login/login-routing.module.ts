import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { EnviarRegistroComponent } from './enviar-registro/enviar-registro.component';
import { RegistroDireccionComponent } from './registro-direccion/registro-direccion.component';
import { HomeComponent } from 'src/app/components/home/home.component';

import { GuardGuard } from 'src/app/guards/guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent,
   children: [{
     path: 'login', component: LoginComponent
    }]
  },
  { path: 'validar', component: RequestPasswordComponent },
  { path: 'recuperar/:TokenADM', component: ForgotPasswordComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'enviarRegistro', component: EnviarRegistroComponent },
  { path: 'direccionRegistro', component: RegistroDireccionComponent },
  { path: 'home', canActivate: [GuardGuard], component: HomeComponent },
  { path: "**", component: LoginComponent}
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
