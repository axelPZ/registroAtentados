import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import  { BehaviorSubject, Observable } from 'rxjs';

import { Global } from "./global";

@Injectable({
    providedIn: 'root'
}) export class ProductoServices {
    private url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

   //Obtener todos los productos
   getProductos( token:string ):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${this.url}/Productos`, {headers: headers }); 
   }

   //Agregar Producto
   addProducto( token:string, data:any ):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', `Bearer ${token}`);
    return this._http.post(`${this.url}/Productos`, JSON.stringify(data), {headers: headers })
   }

   //Obtener producto por id
   getIdProducto(token:string, id:string ):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', `Bearer ${token}`);
    return this._http.get(`${this.url}/Productos/Obtener/Producto/${id}`, {headers: headers } );
   }

   //Obtener nombre producto
   getNameProducto(token:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', `Bearer ${token}`);
    return this._http.get(`${this.url}/Productos/Obtener/Nombre/`, {headers: headers } );
   }

   //Agregar existencia
   addProductoExistencia( token:string, data:any ):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', `Bearer ${token}`);
    return this._http.post(`${this.url}/Productos/Agregar/Existencia`, JSON.stringify(data), {headers: headers })
   }

   //Obtener los proveedores
   getProveedores():any {
    return [
        { "nombre": "Laboratorios S.A", "value": "Laboratorios S.A"},
        { "nombre": "Laboratorios RH", "value": "Laboratorios RH"},
        { "nombre": "AJFASA", "value": "AJFASA"},
        { "nombre": "ALFER", "value": "ALFER"},
        { "nombre": "ADAMED, S.A", "value": "ADAMED, S.A"},
        { "nombre": "BAYER", "value": "BAYER"},
        { "nombre": "FARGEL", "value": "FARGEL"},
        { "nombre": "BONIN", "value": "BONIN"},
        { "nombre": "DAVIS S.A", "value": "DAVIS S.A"},
        { "nombre": "ALFA FARMACEUTICA S.A", "value": "ALFA FARMACEUTICA S.A"}
    ]
   }

   //Obtener el tipo de medicamento
   getCategoria():any {
    return [
        { "nombre": "Analgésicos", "value": "Analgésicos"},
        { "nombre": "Antipiréticos", "value": "Antipiréticos"},
        { "nombre": "Antialérgicos", "value": "Antialérgicos"},
        { "nombre": "Antidiarreicos", "value": "Antidiarreicos"},
        { "nombre": "Antimicóticos", "value": "Antimicóticos"}
    ]
   }


   //Obtener las categorías de medicamentos
   getTipo():any {
    return [
        { "nombre": "Tracto alimentario y metabolismo", "value": "Tracto alimentario y metabolismo"},
        { "nombre": "Sangre y órganos formadores de sangre", "value": "Sangre y órganos formadores de sangre"},
        { "nombre": "Sistema cardiovascular", "value": "Sistema cardiovascular"},
        { "nombre": "Productos dermatológicos", "value": "Productos dermatológicos"},
        { "nombre": "Sistema genitourinario y hormonas sexuales","value": "Sistema genitourinario y hormonas sexuales"},
        { "nombre": "Preparaciones hormonales sistémicas, excluyendo las hormonas sexuales", "value": "Preparaciones hormonales sistémicas, excluyendo las hormonas sexuales"},
        { "nombre": "Antiinfecciosos generales para uso sistémico", "value": "Antiinfecciosos generales para uso sistémico" },
        { "nombre": "Agentes antineoplásicos e inmunomoduladores", "value": "Agentes antineoplásicos e inmunomoduladores"},
        { "nombre": "Sistema músculo-esquelético", "value": "Sistema músculo-esquelético"},
        { "nombre": "Sistema nervioso central", "value": "Sistema nervioso central"},
        { "nombre": "Productos antiparasitarios", "value": "Productos antiparasitarios"},
        { "nombre": "Sistema respiratorio", "value": "Sistema respiratorio"},
        { "nombre": "Órganos sensoriales", "value": "Órganos sensoriales"},
        { "nombre": "Varios", "value": "Varios"}
    ]
   }

   //Obtener bodegas
   getBodega():string[]{
    return [ 'A', 'B', 'C', 'D', 'E', 'F' ];
   }

   //Obtener estantería
   getEstanteria():string[]{
    return [ '101','102', '103', '104', '105', '106', '107', '108', '109', '110', '111', 
             '201','202', '203', '204', '205', '206', '207', '208', '209', '210', '211',
             '301','302', '303', '304', '305', '306', '307', '308', '309', '310', '311'  ]
   }

  //Obtener estantería
  getUbicacion():string[]{
    return [ '101','102', '103', '104', '105', '106', '107', '108', '109', '110', '111', 
             '201','202', '203', '204', '205', '206', '207', '208', '209', '210', '211' ]
   }



}