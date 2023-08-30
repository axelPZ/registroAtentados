import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CdkDrag, CdkDragStart, CdkDragDrop,  moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { MatPaginator } from '@angular/material/paginator';

import Swal from 'sweetalert2';

import { ClienteServices } from 'src/app/services/cliente';
import { ConfServices } from 'src/app/services/configuracion';
import { LoginServices } from 'src/app/services/login';
import { Cliente } from 'src/app/models/clientes';
import { PedidoServices } from 'src/app/services/pedido';


@Component({
  selector: 'app-add-editar-pedidos',
  templateUrl: './add-editar-pedidos.component.html',
  styleUrls: ['./add-editar-pedidos.component.css']
})
export class AddEditarPedidosComponent implements OnInit {

  private paginator: any;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator ){
    this.paginator = mp;
  }


  private cliente: boolean;
  private clienteInfo: any;
  public dataCli: any;
  public clienteData: Cliente;
  public dataProductos: any;
  public todosProductos: any;
  public descripcion: string = '';
  private dataEnviar: any;
  public idPedido: string|any;
  public rol: string;
  public fechaPedido: string;

  public productosAgregados: any[];
  public agregando: any[];
  public total: any;
  public cantidad: number;
  public mover: any;
  public vistaAgregar: boolean;
  public fechaSalida: string;
  public estado: string;
  private token: string|any;
  public candidadDefault: number = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public _lgnService: LoginServices,
    private _snack: MatSnackBar,
    public _conf: ConfServices,
    public _cli: ClienteServices,
    private _pedd: PedidoServices
  ) { 
    this.cliente = true;
    this.clienteData = new Cliente(0,'','',0,'','','','','','','');
    this.total = 0.00;
    this.cantidad = 0;
    this.vistaAgregar = false;
    this.productosAgregados = [];
    this.agregando = [];
    this.fechaSalida = '';
    this.token = localStorage.getItem('TokenAdm');
    this.rol = '';
    this.fechaPedido = '';
    this.estado = '0';
  }

  ngOnInit(): void {
    this._conf.setItemHeader('Pedidos');

    this._lgnService.validarToken();
    this.cliente = this._conf.validarRol([ 'CLIENTE', 'USUARIO', 'ADMINISTRADOR' ] );
    const infoCliente = localStorage.getItem('UsuariAdm') || "";
    this.clienteInfo = JSON.parse( infoCliente );
    this.rol = this.clienteInfo.Tipo;

    console.log("ROl ", this.rol);
    this._route.params.subscribe( params => {
      const idPedido = params['Id'];

      if(idPedido ){
        this.idPedido = idPedido;
        this.getInfoPedido(this.idPedido);
      }else {
        this.mapInfo();
      }
    });
  }



  //obtener la informacion del pedido
  getInfoPedido(id:string){
    if( id ){
      this._pedd.getPedidoId(this.token, id ).subscribe( response => {
        console.log(response);
        const pedido = response.Pedido;
        this.total = pedido.total;
        this.fechaPedido = pedido.fecha;
        this.fechaSalida = pedido.fecha_salida;
        this.estado = pedido.estado;
        console.log( "estado ", this.estado);
        this.productosAgregados = pedido.Detalle.map( (e:any) => {
          return {
            id: e.producto_id, 
            Nombre: e.nombre,
            CantidadAgregada: e.cantidad,  
            Precio: e.precio
          }
        });

        //agregar valor al text area
        const area = document.querySelector(`textarea`) as HTMLTextAreaElement;
        area.value = pedido.descripcion;

        //obtener informacion del cliente dueño del pedido
        this.getDataCliente(pedido.cliente);

      
      }, error => {
        console.log(error);
        this.error("No se pudo obtener la información del pedido")
      })
    }else {
      this.error('No se pudo el id del pedido');
    }
  }


  //Obtener la información del cliente dueño del pedido
  getDataCliente(correo:string){
    this._cli.getDataCliente( this.token, correo).subscribe( response => {
      console.log("INFCLI ", response);
      this.clienteData = response;
    }, error => {
      console.log("errr ", error);
      this.error('No se pudo obtener la información del cliente');
    })
  }

  mapInfo(){
    this.dataCli = this._cli.getDataPedido();
    if( this.dataCli.dataCli ){
      this.clienteData = this.dataCli.dataCli;

      console.log(this.dataCli);

      //Mapear la informacion de los productos
      this.dataProductos = this.dataCli.dataPrds.map( ( e:any )=> {
        return {
          'id': e.producto_id,
          'Nombre': e.nombre, 
          'Categoria': e.categoria, 
          'Tipo': e.tipo, 
          'Cantidad': e.cantidad, 
          'Precio': e.precio, 
          'Fecha': e.fecha_caducidad,
        }
      });

      console.log("Data productos ", this.dataProductos );
      this.todosProductos = this.dataProductos;

    }else {
      this.error("No se pudo obtener la información del pedido");
      this._router.navigate(['/home/Pedidos']);
    }
  }

  //buscar productos en la trabla
  filtrar(e:any){
    if( e.keyCode == 13 ){
      let filtro = ( e.target as HTMLInputElement ).value;
      if( filtro ){
        filtro = filtro.toUpperCase();
        this.dataProductos = this.dataProductos.filter( (e:any) => {
  
          if( e.Nombre.toUpperCase().includes( filtro ) || 
              e.Categoria.toUpperCase().includes( filtro ) ||
              e.Tipo.toUpperCase().includes( filtro ) ){
            return e
          }
        });
      }else {
        this.dataProductos = this.todosProductos;
      }
    }
  }

  //FUnciones del drag and drop
  async agregar(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  async AgregarCantidad( event:any, id: number, cantidad: number ){
    const e = event.target;
    const value = ( e.value ) ? e.value : 0;
    if( value <=0 || isNaN(parseFloat(value))) return
    /*console.log("Id ", id );
    console.log("Cantidad ", cantidad );
    console.log("Valor ", value);*/

    let cantidadAgregar = 0;
    if( value > cantidad ){
      cantidadAgregar = cantidad;
      this.error(`Solo se encuentran en existencias: '${cantidad}' unidades`);
    }else {
      cantidadAgregar = value;
    }
    
      this.productosAgregados = this.productosAgregados.map((e:any)=>{
        if( e.id == id ){
          e.CantidadAgregada = cantidadAgregar;
        }
        return e;
      });

      this.total = 0;
      this.productosAgregados.forEach( e => {
       this.total = this.total + ( e.Precio * e.CantidadAgregada ); 
      });
  }

    //FUnciones del drag and drop
    quitar(event: CdkDragDrop<any[]>) {
      console.log("quitar ", event);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.total = 0;
        this.productosAgregados.forEach( e => {
          this.total = this.total + ( e.Precio * e.CantidadAgregada ) ; 
         });
      
      }
    }

  //enviar solicitud al backend
  onSubmit(){
    console.log(this.fechaSalida);
    console.log(this.productosAgregados);
    let cantidadInvalida = this.productosAgregados.filter( e => ( !e.CantidadAgregada || e.cantidadAgregada <= 0) );

   
    if( this.total > 0 && this.fechaSalida && cantidadInvalida.length <= 0 ){
      this.dataEnviar = {
          FechaSalida: this.fechaSalida,
          Fecha: this.getFecha(),
          Descripcion: this.descripcion
      }

      const detalle = this.productosAgregados.map( (e:any)=> {
        return {
          Producto: e.id,
          Cantidad: e.CantidadAgregada,
          Precio: e.Precio,
          Descripcion: ''
        }
      });

      this.dataEnviar.Detalle = detalle;
      
      this._pedd.addPedido(this.token, this.dataEnviar ).subscribe( e=> {
        console.log(e);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Solicitud Agregada',
          text: 'Se agrego la solicitud correctamente, se le estara notificando por correo, el estado de su solicitud',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });
        this._router.navigate(['/home/Pedidos']);

      }, error => {
        console.log(error);
        this.error("Ocurrio un error al solicitar los productos");
      })

    }else {
      if( cantidadInvalida.length > 0 ){
        this.error('Por favor validar los productos agregados, ya que se encuentran '+ cantidadInvalida.length+ ' productos con cantidades no validas. ')
      }else {
        this.error("Por favor ingresar fecha de salida, y al menos un producto");
      }
    console.log("Cantidades no validas ", cantidadInvalida );

    }
  }


  //agregar fehca
  agregarFecha(event:any){
    this.fechaSalida = event.target.value;
  }

  //agregar descruociuo
  agregarDescripcion( event:any ){
    this.descripcion = event.target.value;
  }

  //obtener fecha actual
  getFecha():string{
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    return  anio + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');
  }

   autorizar():void{
    Swal.fire({
      title: '¿Autorizar Pedido?',
      text: "Seguro que quiere autorizar la salida de pedido No. "+ this.idPedido,
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, autorizar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._pedd.setEstado(this.token, this.idPedido, 'AUTORIZAR').subscribe( response => {
          console.log(response);
          Swal.fire({ 
            title: 'Autorizado!',
            text: 'Se a autorizado el pedido No. '+ this.idPedido,
            icon: 'success',
            heightAuto: false
          });

          this._router.navigate(['/home/Pedidos']);
        }, error => {
          console.log(error);
          this.error('Ocurrio un error, no se pudo autorizar el pedido');
        })

      }
    });
  }

  rechazar():void{
    Swal.fire({
      title: '¿Rechazar Pedido?',
      text: "Seguro que quiere rechazar la salida de pedido No. "+this.idPedido,
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._pedd.setEstado(this.token, this.idPedido, 'RECHAZAR').subscribe( response => {
          Swal.fire({ 
            title: 'Rechazado!',
            text: 'Se a rechazado el pedido No. '+ this.idPedido,
            icon: 'success',
            heightAuto: false
          });

          this._router.navigate(['/home/Pedidos']);

        }, error => {
          console.log(error);
          this.error('No se pudo despachar el pedido');
        });
      }
    });
  }

    //despachar pedido
    despachar(){
      Swal.fire({
        title: '¿Despachar Pedido?',
        text: "Seguro que quiere despachar el pedido No. "+this.idPedido,
        icon: 'warning',
        showCancelButton: true,
        heightAuto: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, despachar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._pedd.setEstado(this.token, this.idPedido, 'DESPACHAR').subscribe( response => {
            Swal.fire({ 
              title: 'Se empezo a despachar!',
              text: 'El pedido con el id: '+ this.idPedido + ' se esta despachando.',
              icon: 'success',
              heightAuto: false
            });
  
            this._router.navigate(['/home/Pedidos']);
  
          }, error => {
            console.log(error);
            this.error('No se pudo despachar el pedido');
          });
        }
      });
    }

    //Finalizar despacho
      finDespachar(){
        Swal.fire({
          title: '¿Finalizar?',
          text: "Seguro que quiere finalizar el pedido No. "+this.idPedido,
          icon: 'warning',
          showCancelButton: true,
          heightAuto: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, finalizar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this._pedd.setEstado(this.token, this.idPedido, 'DESPACHADO').subscribe( response => {
              Swal.fire({ 
                title: 'Finalizado!',
                text: 'El pedido con el id: '+ this.idPedido + ' a finalizado.',
                icon: 'success',
                heightAuto: false
              });
    
              this._router.navigate(['/home/Pedidos']);
    
            }, error => {
              console.log(error);
              this.error('No se pudo despachar el pedido');
            });
          }
        });
      }

      totalProducto( precio:number, cantidad:number ):number {
        let total:any = ( precio * cantidad );
        if( isNaN(total) || total <= 0) return 0;
        total = (parseFloat(total)).toFixed(2);
        return total
      }

      getCantidad( cantidad:any ){
        let cnt = parseFloat(cantidad);
        return ( isNaN(cnt) || cnt<=0)? 0 : cnt;
      }

  error(mensaje:string):void{
    this._snack.open(mensaje, 'Ok', {
       duration: 6000,
       horizontalPosition: 'right',
       verticalPosition: 'bottom'
     })
   }

   mostrarAgregar(){
    this.vistaAgregar = true;
   }

   ocultarAgregar(){
    console.log("Productos agregados ", this.productosAgregados);
    this.vistaAgregar = false;
   }

}
