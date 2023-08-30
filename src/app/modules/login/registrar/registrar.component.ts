import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginServices } from 'src/app/services/login';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  validForm!: FormGroup;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _loginS: LoginServices,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validForm = this.initForm();
  }

  onSubmit(e:any):void{
    if( !this.validForm.invalid ){
      this._loginS.setSteepPersonal(this.validForm.value );
      this._router.navigate(['/login/direccionRegistro'])
    }else{
      this.error('Valide que los campos del formulario esten llenos');
    }

  }

  get Nombres(){
    return this.validForm.get('Nombres');
  }

  get Apellidos(){
    return this.validForm.get('Apellidos');
  }

  get Edad(){
    return this.validForm.get('Edad');
  }

  get Empresa(){
    return this.validForm.get('Empresa');
  }

  initForm():FormGroup {
    return this._fb.group({
      Nombres: ['', [   Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(50),
                        Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ ]*') ]],
      Apellidos: ['', [ Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(50),
                        Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ ]*') ]],
      Empresa: ['', [ Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(50),
                          Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚñÑ. ]*') ]],
      Edad: ['', [ Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(3),
                        Validators.pattern('[0-9]*') ]]
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
