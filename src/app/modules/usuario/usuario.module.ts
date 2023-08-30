import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

import { HomeUsuariosComponent } from './home-usuarios/home-usuarios.component';
import { AddEditarUsuarioComponent } from './add-editar-usuario/add-editar-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [
    HomeUsuariosComponent,
    AddEditarUsuarioComponent,
  
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class UsuarioModule { }
