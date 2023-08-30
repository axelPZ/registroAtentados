import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';

import { HomePedidosComponent } from './home-pedidos/home-pedidos.component';
import { AddEditarPedidosComponent } from './add-editar-pedidos/add-editar-pedidos.component';
import { PedidosRoutingModule } from './pedidos-routing.module';



@NgModule({
  declarations: [
    HomePedidosComponent,
    AddEditarPedidosComponent,
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    DragDropModule,
    MatSortModule
  ]
})
export class PedidosModule { }
