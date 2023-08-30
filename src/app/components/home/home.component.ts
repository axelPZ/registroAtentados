import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginServices } from 'src/app/services/login';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private clienteInfo: any;
  public rol:string;
  constructor(
    private _lgnService: LoginServices,
    private _router: Router,
  ) { 
    this.rol = '';
  }

  ngOnInit(): void {
    const infoCliente = localStorage.getItem('UsuariAdm') || "";
    this.clienteInfo = JSON.parse( infoCliente );
    this.rol = this.clienteInfo.Tipo;

    console.log("ROl MENU", this.rol);
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
