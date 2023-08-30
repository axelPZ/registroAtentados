import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginServices } from 'src/app/services/login';


@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css']
})
export class RequestPasswordComponent implements OnInit {

  spinner: boolean;

  validForm!: FormGroup;
  private isUsuario: boolean;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _loginServices: LoginServices,
    private _snack: MatSnackBar,

  ) {
    this.spinner = false;
    this.isUsuario = false;
   }

  ngOnInit(): void {
    this.validForm = this.initForm();
  }

  onSubmit(e:any):void {
    this.spinner = true;
    if( !this.validForm.invalid ){
      const data = {
        Correo: this.validForm.value.Correo,
        Tipo: ( this.isUsuario ) ? "CLIENTE" : "USUARIO"
      }
      this._loginServices.enviarCorreoContrasenia( data ).subscribe( response => {
        this.spinner = false;
        this._loginServices.setEstadoSession(`Se a enviado un mensaje al correo: ${data.Correo}, el cual tiene una valides de 5 minutos, al pasar el limite de tiempo, tendra que volver a enviar este formulario.`);
        this._router.navigate(['/login']);
      }, error => {
        console.log(error);
        this.spinner = false;
        const mensaje = ( error.error.Mensaje ) ? error.error.Mensaje : 'Ocurrion un error al enviar el mensaje, por favor intentelo más tarde';
        this.error(mensaje);
      })
    }else {
      this.error('Valide que el correo del formulario sea correcto');
    }
    console.log(this.validForm.value );
  }

  get Correo(){
    return this.validForm.get('Correo');
  }

  initForm():FormGroup {
    return this._fb.group({
      Correo: ['', [  Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(100),
                      Validators.email ] ]
    } );
  }

  administrador(e:any):void{
    this.isUsuario = ( e.checked );
  }

  error(mensaje:string):void{
    this._snack.open(mensaje, 'Ok', {
       duration: 10000,
       horizontalPosition: 'right',
       verticalPosition: 'bottom'
     })
   }
}
