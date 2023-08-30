import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import  { BehaviorSubject, Observable } from 'rxjs';

import { Global } from "./global";

@Injectable({
    providedIn: 'root'
}) export class UsuarioServices {
    private url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    //Obtener los usuarios
    getUsuarios( token:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Usuarios`, {headers: headers });
    }

    //Agregar usuario
    addUsuarios(token:string|null, data:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);

        return this._http.post(`${this.url}/Usuarios`, JSON.stringify( data ), { headers: headers } );
    }

}