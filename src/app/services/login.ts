import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import  { BehaviorSubject, Observable, of } from 'rxjs';

import { Global } from "./global";

@Injectable({
    providedIn: 'root'
}) export class LoginServices {
    private url: string;

    public steepPersonal = new BehaviorSubject('');
    public steepDireccion = new BehaviorSubject('');
    public steepCuenta = new BehaviorSubject('');
    public loginBS = new BehaviorSubject('');

    public estadoSession = new BehaviorSubject('');


    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    setEstadoSession(info:any){
        this.estadoSession.next(info);
    }
    getEstadoSession(){
        return this.estadoSession.getValue();
    }

    setLoginBS(info:any){
        this.loginBS.next(info);
    }
    getLoginBS(){
        return this.loginBS.getValue();
    }

    setSteepPersonal(info:any){
        this.steepPersonal.next(info);
    }
    getSteepPersonal(){
        return this.steepPersonal.getValue();
    }

    setSteepDireccion(info:any){
        this.steepDireccion.next(info);
    }
    getSteepPersonalDireccion(){
        return this.steepDireccion.getValue();
    }

    setSteepCuenta(info:any){
        this.steepDireccion.next(info);
    }
    getSteepPersonalCuenta(){
        return this.steepDireccion.getValue();
    }

    //hacer login
    login( data:any ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/Auth', JSON.stringify(data), {headers: headers});
    }

    //validar el token 
    validarToken():Observable<boolean>{
        const token = localStorage.getItem('TokenAdm') || '';
        const headers = new HttpHeaders().set('tokenadm', token)
        return this._http.get(`${this.url}/Auth/Validar/Token`, { headers: headers} ).pipe(
            map( ( res:any) => {
                console.log("newToken ", res.token);
                localStorage.setItem("TokenAdm", res.token);
                localStorage.setItem("UsuariAdm", JSON.stringify(res.Usuario));
                return true;
            }),
            catchError( error => {
                localStorage.removeItem("TokenAdm");
                this.setEstadoSession('¡Usuario no autorizado!, por favor inicie sessión, para poder ingresar al sitio web');
                return of(false)
            })
        )
    }

    //Enviar correo para recuperar contraseña
    enviarCorreoContrasenia(data:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/Auth/Validar/Correo', JSON.stringify(data), {headers: headers});
    }

    //Cambiar contraseña
    cambiarContrasenia(data:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/Auth/Cambiar/Password', JSON.stringify(data), {headers: headers});
    }

    //Cerrar session
    cerrarSession():boolean{
        localStorage.removeItem('TokenAdm');
        localStorage.removeItem('UsuarioAdm');
        this.setEstadoSession('Se a cerrado la sessión exitosamente');
        return true;
    }

}