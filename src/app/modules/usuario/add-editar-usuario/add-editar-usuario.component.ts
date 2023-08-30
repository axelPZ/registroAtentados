import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuarios';
import { UsuarioServices } from 'src/app/services/usuario';


@Component({
  selector: 'app-add-editar-usuario',
  templateUrl: './add-editar-usuario.component.html',
  styleUrls: ['./add-editar-usuario.component.css']
})
export class AddEditarUsuarioComponent implements OnInit {

  validForm!: FormGroup;
  public spinner: boolean;
  public isAdmin: boolean;
  private token: string|null;
  private user: string|null;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _snack: MatSnackBar,
    private _usrServices: UsuarioServices
  ) {
    this.spinner = false;
    this.isAdmin = false;
    this.token = localStorage.getItem('TokenAdm');
    this.user = localStorage.getItem('TokenAdm'); 
   }

   

  ngOnInit(): void {
    this.validForm = this.initForm();
  }

  onSubmit(e:any):void{
    this.spinner = true;
    if( !this.validForm.invalid ){
      const data = {
        Nombres: this.validForm.value.Nombres,
        Apellidos: this.validForm.value.Apellidos,
        Edad: this.validForm.value.Edad,
        Correo: this.validForm.value.Correo,
        Rol: (this.isAdmin) ? 'Administrador':'Usuario',
        Password: this.validForm.value.Password 
      } 
      console.log(data);

      setTimeout(() => {
        this._usrServices.addUsuarios(this.token, data).subscribe( response => {
          this.spinner = false;
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado',
            showConfirmButton: true,
            heightAuto: false
          });
          this._router.navigate(['/home/Usuarios']);
        }, err => {
          console.log(err);
            let mensaje = ( err.error.Mensaje )? err.error.Mensaje : 'Ocurrio un error al intentar agregar al usuario';
            this.error(mensaje);
            this.spinner = false;
        });
      }, 3000);



    }else {
      this.error('Vakude que los campos del formulario esten correctamente llenos');
    }
  }

  administrador(e:any):void{
    this.isAdmin = ( e.checked );
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

  get Direccion(){
    return this.validForm.get('Direccion');
  }

  get Departamento(){
    return this.validForm.get('Departamento');
  }

  get Municipio(){
    return this.validForm.get('Municipio');
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
      Nombres: ['', [     Validators.required,
                          Validators.minLength(2),
                          Validators.maxLength(50),
                          Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ ]*') ]],
      Apellidos: ['', [   Validators.required,
                          Validators.minLength(2),
                          Validators.maxLength(50),
                          Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ ]*') ]],
      Edad: ['', [        Validators.required,
                          Validators.minLength(1),
                          Validators.maxLength(3),
                          Validators.pattern('[0-9]*') ]],
      Direccion: ['', [   Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(100) ]],
      Departamento: ['', [Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(50),
                          Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*') ]],
      Municipio: ['', [   Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(50),
                          Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*') ]],
      Correo: ['', [      Validators.required,
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
