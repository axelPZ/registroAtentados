import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutLoginComponent } from './modules/login/layout-login/layout-login.component';
import { MainComponent } from './components/main/main.component';

import  { GuardGuard } from './guards/guard.guard'
const routes: Routes = [
  //{ path: 'home', canActivate : [GuardGuard], component: MainComponent, children: [
  { path: 'home', component: MainComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'Usuarios', loadChildren: ()=> import('./modules/usuario/usuario.module').then(m => m.UsuarioModule ) },
    { path: 'Pedidos',  loadChildren: ()=> import('./modules/pedidos/pedidos.module').then( m => m.PedidosModule ) },

  ] },
  { path: '', component: LayoutLoginComponent, children: [{
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    { path: 'login', loadChildren: ()=> import('./modules/login/login.module').then( m => m.LoginModule ) },
    { path: '**', component: HomeComponent },
  ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
