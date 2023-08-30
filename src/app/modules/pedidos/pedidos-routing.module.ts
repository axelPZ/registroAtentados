import { NgModule } from '@angular/core';
import { HomePedidosComponent } from './home-pedidos/home-pedidos.component';
import { AddEditarPedidosComponent } from './add-editar-pedidos/add-editar-pedidos.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePedidosComponent },
  { path: 'Agregar', component: AddEditarPedidosComponent},
  { path: 'Editar/:Id', component: AddEditarPedidosComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
