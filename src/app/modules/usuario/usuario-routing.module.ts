import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeUsuariosComponent } from './home-usuarios/home-usuarios.component';
import { AddEditarUsuarioComponent } from './add-editar-usuario/add-editar-usuario.component';

const routes: Routes = [
  { path: '', component: HomeUsuariosComponent },
  { path: 'Agregar', component: AddEditarUsuarioComponent },
  { path: 'Editar:Correo', component: AddEditarUsuarioComponent },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
