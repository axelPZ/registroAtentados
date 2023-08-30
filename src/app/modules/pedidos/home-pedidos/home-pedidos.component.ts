import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

import { LoginServices } from 'src/app/services/login';
import { ConfServices } from 'src/app/services/configuracion';
import { Pedido } from 'src/app/models/pedido';
import { PedidoServices } from 'src/app/services/pedido';

@Component({
  selector: 'app-home-pedidos',
  templateUrl: './home-pedidos.component.html',
  styleUrls: ['./home-pedidos.component.css']
})
export class HomePedidosComponent implements OnInit {

  private paginator: any;
  private clienteInfo: any;
  public permisos: string;
  public dataSurce:any;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator ){
    this.paginator = mp;
  }

  @ViewChild(MatSort, { static: true } ) sort!: MatSort;

  public pedidosTable: any;
  public usuario: any;
  displayColumns: string[]=['No', 'FechaA', 'Estado', 'Usuario', 'Cliente', 'FechaS','Ver']

  private infLogin: any;
  private token: string|any;
  public cliente: boolean|any; 
  //private pedido: string|any;
  private todosPedidos: any[];
 // public pedidos: any;

 public inputBuscar:string;
 private estados: string[] = [ 'PENDIENTE','AUTORIZADO', 'RECHAZADO', 'DESPACHANDO...', 'DESPACHADO' ]; 
public dataPedidos: any;

  constructor(   
    private _router: Router,
    private _route: ActivatedRoute,
    public _lgnService: LoginServices,
    private _snack: MatSnackBar,
    public _conf: ConfServices,
    public _pedd: PedidoServices,

    ) {
      this.token = localStorage.getItem('TokenAdm');
      this.usuario = localStorage.getItem('UsuarioAdm');
      this.todosPedidos = [];
      this.inputBuscar = '';
      this.cliente = true;
      this.clienteInfo = {};
      this.permisos = '';
     }


    //https://www.angularjswiki.com/material/mat-table-sort/

  ngOnInit(): void {
   /* this._conf.setItemHeader('Pedidos');
    this._lgnService.validarToken();
    this.cliente = this._conf.validarRol([ 'CLIENTE', 'USUARIO', 'ADMINISTRADOR'] );

    const infoCliente = localStorage.getItem('UsuariAdm') || "";
    this.clienteInfo = JSON.parse( infoCliente );
    this.permisos = this.clienteInfo.Tipo;
    console.log(this.permisos);
    if( this.permisos == "CLIENTE"){
      this.getPedidosCliente()
    }else if( this.permisos == "ADMINISTRADOR"){
      this.getPedidosAdmin()
    }else if( this.permisos == "USUARIO"){
      this.getPedidosUsuario()
    }*/
  }
 


  getPedidosAdmin(){
    this._pedd.getPedidos( this.token ).subscribe( response => {
      console.log(response);
      this.getPedidos(response.Pedidos);
    }, error => {
      console.log(error);
      this.error("Ocurrio un error al obtener los pedidos del usuario");
    })    
  }

  getPedidosUsuario(){
    this._pedd.getPedidosUsuario( this.token ).subscribe( response => {
      console.log(response);
      this.getPedidos(response);
    }, error => {
      console.log(error);
      this.error("Ocurrio un error al obtener los pedidos del usuario");
    })    
  }

  getPedidosCliente(){
    this._pedd.getPedidosCliente( this.token ).subscribe( response => {
      this.getPedidos(response);
    }, error => {
      console.log(error);
      this.error("Ocurrio un error al obtener los pedidos del usuario");
    })    
  }

  getPedidos(pedidos:any):void{
    setTimeout(() => {
      const data = pedidos.map( (e:any)=>{
        return {
          'No': e.pedido_id, 
          'FechaA': ( e.estado == 1 || e.estado == 3 || e.estado == 5 ) ? e.fecha_autorizacion : 'No Autorizado', 
          'Total': e.total, 
          'Estado': this.getEstado( e.estado ),
          'Usuario': (e.usuario_autorizo != 'SINAUTORIZAR@GMAIL.COM' ) ? e.usuario_autorizo: 'No Autorizado', 
          'Cliente': e.cliente, 
          'Fecha': e.fecha, 
          'FechaS': e.fecha_salida,
        }
      });
  
      console.log(data);
      this.pedidosTable = new MatTableDataSource(data);
      this.pedidosTable.paginator = this.paginator;
      this.pedidosTable.sort = this.sort;
      this.todosPedidos = data;

    }, 1600);
    
  }


  //obtener estado
  getEstado(estado:number):string {
    if( estado > 5 ) return "No Valido";
    return this.estados[estado];
  }



  descargar(e:any){
    const data = this.pedidosTable.filteredData.map( (e:any)=>{
      return {
        'Fecha Autorizado': e.FechaA,
        'Monto Total': e.Total,
        'Estado': e.Estado,
        'Usuario': e.Usuario,
        'Cliente': e.Cliente,
        'Fecha': e.Fecha,
        'Fecha de Salida': e.FechaS
      };
    });

    if( data && data.length > 0 ){
      this._conf.donwloadCVC(data,'Pedidos');
    }else {
      this.error('No existe información para descargar');
    }
  }

  filtrar(e:any):void{
    if( e.keyCode == 13){
      const filtro = ( e.target as HTMLInputElement ).value;
      this.pedidosTable.filter = filtro.trim().toLocaleLowerCase();
      console.log(e.target.value);
      console.log(e);
      console.log(this.inputBuscar);
    }
   }


  error(mensaje:string):void{
    this._snack.open(mensaje, 'Ok', {
       duration: 6000,
       horizontalPosition: 'right',
       verticalPosition: 'bottom'
     })
   }

}
