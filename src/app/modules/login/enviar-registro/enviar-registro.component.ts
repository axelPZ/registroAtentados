import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

import { LoginServices } from 'src/app/services/login';
import { Limpiarervices } from 'src/app/services/limpiar';
import { ClienteServices } from 'src/app/services/cliente';

@Component({
  selector: 'app-enviar-registro',
  templateUrl: './enviar-registro.component.html',
  styleUrls: ['./enviar-registro.component.css']
})
export class EnviarRegistroComponent implements OnInit {

  validForm!: FormGroup;
  personal: any;
  direccion: any;
  spinner: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _loginS: LoginServices,
    private _snack: MatSnackBar,
    private _limpiar: Limpiarervices,
    private _clienteS: ClienteServices
  ) { 
    this.spinner = false;
  }

  ngOnInit(): void {
    this.validForm = this.initForm();
    this.existPersonal();
  }

  existPersonal():void{
   if( !this._loginS.getSteepPersonal() ){
      this.error('Por favor llene la seccion anterior');
      this._router.navigate( ['/login/registrar'] )
    }
  }

  onSubmit(e:any):void{
    this.spinner = true;
    if( !this.validForm.invalid ){
      
      const cuenta = this.validForm.value;

      if( cuenta.Password == cuenta.RepetirPassword ){
        this.direccion = this._loginS.getSteepPersonalDireccion();
        this.personal = this._loginS.getSteepPersonal();
  
        const info = {
          Correo: cuenta.Correo,
          Password: cuenta.Password,
          Departamento: this.direccion['Departamento'], 
          Direccion: this._limpiar.clearAFN(this.direccion?.Direccion),
          Municipio: this.direccion?.Municipio,
          Descripcion: this.direccion?.Descripcion,
          Nombres: this.personal.Nombres,
          Apellidos: this.personal.Apellidos,
          Edad: this.personal.Edad,
          Empresa: this.personal.Empresa
        }

        setTimeout(() => {
          this.spinner=false;

          this._clienteS.addCliente( info ).subscribe( response => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Registro agregado',
              showConfirmButton: true,
              heightAuto: false
            });
            this._router.navigate(['/login']);

          }, error => {
            console.log(error);
            this.error('Ocurrio un error al intentar registrarse, por favor intentar más tarde.')
          });
         
        }, 3000);
  
        //element.value.replace(/[^]/gi, "")
        console.log("Cuenta ", info);
      }else {
        this.error('Las contraseñas no son iguales');
      }
    }else{
      this.error('Valide que los campos del formulario esten llenos');
    }

  }

  get Correo(){
    return this.validForm.get('Correo');
  }

  get Password(){
    return this.validForm.get('Password');
  }

  get RepetirPassword(){
    return this.validForm.get('RepetirPassword');
  }

  initForm():FormGroup {
    return this._fb.group({
      Correo: ['', [ Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(100),
                        Validators.email ]],
      Password: ['', [ Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(15),
                        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]],
      RepetirPassword: ['', [ Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(15),
                        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]]
    });
  }

  error(mensaje:string):void{
   this._snack.open(mensaje, 'Ok', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }
}
