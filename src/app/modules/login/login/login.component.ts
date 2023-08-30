import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

import { LoginServices } from 'src/app/services/login';
import { Limpiarervices } from 'src/app/services/limpiar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validForm!: FormGroup;
  spinner: boolean;
  private loginData: any;
  private isUsuario: boolean;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _loginS: LoginServices,
    private _snack: MatSnackBar,
    private _limpiar: Limpiarervices

  ) {
    this.spinner = false;
    this.isUsuario = false;
  }

  ngOnInit(): void {

    this._loginS.estadoSession.subscribe( e=> {
      if( e== '')return 
      this.error(e);
      this._loginS.setEstadoSession('');
    })

    this.validForm = this.initForm();
  }

  onSubmit(e:any){
    this.spinner = true;
    if( !this.validForm.invalid ){

      const data = {
        Correo : this.validForm.value.Correo,
        Password: this.validForm.value.Password,
        Tipo: ( this.isUsuario ) ? "CLIENTE" : "USUARIO"
      }

        this._loginS.login( data ).subscribe( response =>{
          this.spinner = false;
          this._router.navigate( ['/home/Pedidos'] );

       
        }, err => {
          console.log(err);
          this._router.navigate( ['/home/Pedidos'] );
          let mensaje = ( err.error.Mensaje )? err.error.Mensaje : 'Ocurrio un error al validar las credenciales';
          this.error(mensaje);
          this.spinner = false;
        })
    }else{
      this.error("Valide que los campos del formulario esten correctamente.");
    }
  }

  get Correo(){
    return this.validForm.get('Correo');
  }

  get Password(){
    return this.validForm.get('Password');
  }

  administrador(e:any):void{
    this.isUsuario = ( e.checked );
  }

  initForm():FormGroup {
    return this._fb.group({
      Correo: ['', [  Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(100),
                      Validators.email ]],
      Password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(15),
                      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]]
    })
  }

  error(mensaje:string):void{
    this._snack.open(mensaje, 'Ok', {
       duration: 6000,
       horizontalPosition: 'right',
       verticalPosition: 'bottom'
     })
   }
}
