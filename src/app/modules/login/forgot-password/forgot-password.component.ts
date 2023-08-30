import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginServices } from 'src/app/services/login';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public spinner:boolean;
  private token:string;

  validForm!: FormGroup;
  constructor(
    private _loginService: LoginServices,
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _snack: MatSnackBar,
  ) {
    this.spinner = false; 
    this.token = "";
  }

  ngOnInit(): void {
    this.validForm = this.initForm();
    this.getToken();
  }

  getToken():void{
    this._route.params.subscribe( params => {
      const Token = params['TokenADM'];
      if( Token ){
        this.token = Token;
      }else {
        this._loginService.setEstadoSession('Token no valido');
       this._router.navigate(['/login']);
      }
    })
  }

  onSubmit(e:any){
    this.spinner = true;
    if( !this.validForm.invalid ){
      const cambio = this.validForm.value;
      
      if( cambio.Password == cambio.RepetirPassword ){
        const data = {
          "Password": cambio.Password,
          "Tipo": "Usuario",
          "Token": this.token
        }

        setTimeout(() => {
          this._loginService.cambiarContrasenia( data ).subscribe( response => {
            console.log(response);
            this._loginService.setEstadoSession('Se a cambiado tu contraseña')
            this._router.navigate(['/login']);

          }, err => {
            console.log(err);
            this.spinner = false;
            let mensaje = ( err.error.Mensaje )? err.error.Mensaje : "Ocurrio un error al cambiar la contraseña, por favor intentelo más tarde";
            this.error(mensaje);
            this._router.navigate(['/login']);
          });
        }, 3000);
        
      }else {
        this.error('Las contraseñas no son iguales');
      }
    }else {
      this.error('Valide que el formulario este completo');
    }
  }

  get Password(){
    return this.validForm.get('Password');
  }

  get RepetirPassword(){
    return this.validForm.get('RepetirPassword');
  }

  initForm():FormGroup {
    return this._fb.group({
      Password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]],
      RepetirPassword: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(15),
                      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]]
    })
  }

  error(mensaje:string):void{
    this._snack.open(mensaje, 'Ok', {
       duration: 10000,
       horizontalPosition: 'right',
       verticalPosition: 'bottom'
     })
   }

}
