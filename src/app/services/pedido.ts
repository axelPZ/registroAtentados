import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import  { BehaviorSubject, Observable } from 'rxjs';

import { Global } from "./global";

@Injectable({
    providedIn: 'root'
}) export class PedidoServices {
    private url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    //Obtener los usuarios
    getPedidos( token:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Pedidos`, {headers: headers });
    }

    //Obtener pedidos de los usuarios
    getPedidosUsuario( token:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Pedidos/Usuario`, {headers: headers });
    }

    //Obtener pedidos por fechas
    getPedidosFechas( token:string, data:any ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', `Bearer ${token}`);

        return this._http.post(`${this.url}/Pedidos/Fechas`, JSON.stringify(data), {headers: headers });
    }

    //Obtener pedido por id
    getPedidoId( token:string, id:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', `Bearer ${token}`);

        return this._http.get(`${this.url}/Pedidos/`+id, {headers: headers });
    }

    //Agregar Pedido
    addPedido( token:string, data:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);
        return this._http.post(`${this.url}/Pedidos`, JSON.stringify( data ), { headers: headers } );

    }

     //Pedido por cliente logiado
     getPedidosCliente( token:string ):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);
        return this._http.get(`${this.url}/Pedidos/Cliente/Email`,  { headers: headers } );

    }

    //Cambiar el estado al pedido
    setEstado(token:string, id:string, tipo:string ):Observable<any>{
        console.log(token);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);

        return this._http.post(`${this.url}/Pedidos/Cambiar/Estatus/${id}/${tipo}`,{}, { headers: headers } );
    }

}