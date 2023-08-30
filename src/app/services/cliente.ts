import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import  { BehaviorSubject, Observable, of } from 'rxjs';

import { Global } from "./global";

@Injectable({
    providedIn: 'root'
}) export class ClienteServices {
    private url: string;

    public dataPedido = new BehaviorSubject('');

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    setDataPedido(info:any){
        this.dataPedido.next(info);
    }

    getDataPedido(){
        return this.dataPedido.getValue();
    }


    //Agregar cliente
    addCliente( data:any ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}/Clientes`, JSON.stringify(data), { headers: headers } );
    }

    //Obtener los usuarios
    getUsuarios( token:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Usuarios`, {headers: headers });
    }

    //Obtener información del cliente atravez del token
    getDataToken( token: string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Clientes/Informacion`, { headers: headers } );
    }

    //Obtener informacion del cliente por correo
    getDataCliente( token:string, correo:string):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Clientes/Informacion/`+correo, { headers: headers } );
    }

    //Obtener todos los clientes
    getClientes( token:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Clientes/`, { headers: headers } );
    }
   

}