import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { LoginServices } from 'src/app/services/login';
import { UsuarioServices } from 'src/app/services/usuario';
import { Usuario } from 'src/app/models/usuarios';
import { ConfServices } from 'src/app/services/configuracion';

@Component({
  selector: 'app-home-usuarios',
  templateUrl: './home-usuarios.component.html',
  styleUrls: ['./home-usuarios.component.css']
})
export class HomeUsuariosComponent implements OnInit {

  private paginator: any;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator ){
    this.paginator = mp;
  }

  @ViewChild(MatSort, { static: true } ) sort!: MatSort;


  displayColumns: string[]=['No', 'Nombres', 'Apellidos', 'Edad', 'Correo', 'Rol' ]

  private infLogin: any;
  private token: string|any;
  private user: string|any;
  private todosUsuarios: any[];
  public usuarios: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public _usrService: UsuarioServices,
    public _lgnService: LoginServices,
    private _snack: MatSnackBar,
    public _conf: ConfServices
  ) { 
    this.token = localStorage.getItem('TokenAdm');
    this.user = localStorage.getItem('UsuarioAdm');
    this.todosUsuarios = [];
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.getUsuarios();
    this._conf.setItemHeader('Usuarios');
  }

  filtrar(e:any):void{
    if( e.keyCode == 13){
      const filtro = ( e.target as HTMLInputElement ).value;
      this.usuarios.filter = filtro.trim().toLocaleLowerCase();
      console.log(e.target.value);
      console.log(e);
      //console.log(this.inputBuscar);
    }
   }

  getUsuarios():void{

    setTimeout(() => {
      this._usrService.getUsuarios(this.token).subscribe( response =>{
        console.log(response);
        this.usuarios = response.Usuarios;
        const data = this.usuarios.map( (e:any)=>{
          return {
            'No' : e.id_usr,
            'Nombres': e.nombres,
            'Apellidos': e.apellidos, 
            'Edad': e.edad, 
            'Direccion': e.direccion, 
            'Correo': e.correo, 
            'Rol': e.rol
          }
        });
  
        console.log(data);
        this.usuarios = new MatTableDataSource(data);
        this.usuarios.paginator = this.paginator;
        this.usuarios.sort = this.sort;
        this.todosUsuarios = data;
  
      }, err => {
  
        console.log(err);
        console.log(err.status);
        if( err.status == 401 || err.status == 403 ){
          const mensaje = ( err.status == 403 ) ? 'Usuario no autorizado' : 'Session finalizada';
          this.error(mensaje);
          setTimeout(() => { this._router.navigate(['/login']) }, 3000);
          
        }else {
  
        }
      })
    }, 1600);
  }

  error(mensaje:string):void{
    this._snack.open(mensaje, 'Ok', {
       duration: 6000,
       horizontalPosition: 'right',
       verticalPosition: 'bottom'
     })
   }

}
