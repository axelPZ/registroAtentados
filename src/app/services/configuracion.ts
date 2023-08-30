import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import  { BehaviorSubject, Observable } from 'rxjs';

import { LoginServices } from "./login";


@Injectable({
    providedIn: 'root'
}) export class ConfServices {

    public itemHeader = new BehaviorSubject('');
    private tipo:string|any;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _login: LoginServices
    ){}

    setItemHeader(info:any){
        this.itemHeader.next(info);
    }
    geItemHeader(){
        return this.itemHeader.getValue()
    }

    //validar rol
    validarRol(nesesario:string[]){
        this.tipo = localStorage.getItem("UsuariAdm");
        this.tipo = JSON.parse( this.tipo  );

        const permisos = nesesario.find( e => e == this.tipo.Tipo );
        if( permisos ){
            this.tipo = ( this.tipo.Tipo == "CLIENTE" );
            return this.tipo;
        }else{
            localStorage.removeItem("TokenAdm");
            this._router.navigate(['/login']);
            this._login.setEstadoSession('Usuario no autorizado');
        }
        
    }
        

    //descargar archivo csv    
    donwloadCVC(data:any, filename:string){
        let headers = [];
        for (const key in data[0]) {
            if (Object.prototype.hasOwnProperty.call(data[0], key)) 
                headers.push(key);                
        }

        const dataCVC = this.convertCSV(data, headers);
        //console.log("data", dataCVC);
        
        let blob = new Blob(['\ufeff'+ dataCVC], {
            type: 'text/csv;charset=utf-8;'
        });

        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1; 
        navigator.userAgent.indexOf('Chrome') == -1;

         //if Safari open in new window to save file with random filename.
        if (isSafariBrowser) { 
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

         //convertir json a cvc
         convertCSV(dataJson:object, headerList:any ){
            let array = typeof dataJson != 'object' ? JSON.parse(dataJson) : dataJson;
            let str = '';
            let row = '';
            for (const i in headerList) {
                row += headerList[i] + '; ';
            }
    
            str += row + '\n';
            for (const iterator of array) {
                let line = '';
                for(let index in headerList ){
                    let head = headerList[index];
                    let data = String( iterator[head] );
                    line += data.replace(/;/g, ':') + ';';
                }
                str += line + '\n';
                
                console.log(str);
            }
    
            return str;
    
        }
}