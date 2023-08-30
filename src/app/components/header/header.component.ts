import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfServices } from 'src/app/services/configuracion';
import { LoginServices } from 'src/app/services/login';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public intemMenu: string;
  private clienteInfo: any;
  public rol:string;
  constructor(
    public _conf : ConfServices,
    private _lgnService: LoginServices,
    private _router: Router,
  ) { 
    this.intemMenu = "Usuarios";
    this.rol = '';
  }

  ngOnInit(): void {
    this._conf.itemHeader.subscribe((e:any)=>{
      if( e== "" )return;
      this.intemMenu = e;
    })

    const infoCliente = localStorage.getItem('UsuariAdm') || "";
    this.clienteInfo = JSON.parse( infoCliente );
    this.rol = this.clienteInfo.Tipo;

    console.log("ROl Headers", this.rol);

  }

  
  Salir(e:any){
    console.log("salir");
    Swal.fire({
      title: '¿Cerrar Session?',
      text: "Se cerrara la sessión, y te redireccionaremos al login",
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const cerrar = this._lgnService.cerrarSession();
        console.log("cerrar", cerrar);
        if( cerrar ) this._router.navigate( ['/login'] );
      }
    })
  }

}
