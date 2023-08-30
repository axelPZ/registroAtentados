import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginServices } from 'src/app/services/login';


@Component({
  selector: 'app-registro-direccion',
  templateUrl: './registro-direccion.component.html',
  styleUrls: ['./registro-direccion.component.css']
})
export class RegistroDireccionComponent implements OnInit {
  
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
    this.existPersonal();
  }

  existPersonal():void{
   if( !this._loginS.getSteepPersonal() ){
      this.error('Por favor llene la seccion anterior');
      setTimeout(() => {
        this._router.navigate( ['/login/registrar'] )
      }, 3000);
    }
  }

  onSubmit(e:any):void{
    if( !this.validForm.invalid ){
      const data = {
        Direccion: this.validForm.value.Direccion,
        Departamento: this.validForm.value.Departamento,
        Municipio: this.validForm.value.Municipio,
        Descripcion: this.validForm.value.Descripcion
      }
      this._loginS.setSteepDireccion(data);
      this._router.navigate(['/login/enviarRegistro']);
    }else{
      this.error('Valide que los campos del formulario esten llenos');
    }

  }

  get Direccion(){
    return this.validForm.get('Direccion');
  }

  get Departamento(){
    return this.validForm.get('Departamento');
  }

  get Municipio(){
    return this.validForm.get('Municipio');
  }

  get Descripcion(){
    return this.validForm.get('Descripcion');
  }


  initForm():FormGroup {
    return this._fb.group({
      Direccion: ['', [   Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(100)]],
      Departamento:['',[Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(50),
                        Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*') ]],
      Municipio: ['', [ Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(50),
                        Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*') ]],
      Descripcion: ['',[Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(100) ]],
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
