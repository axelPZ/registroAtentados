import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
}) export class Limpiarervices {

    clearAFN(input:string):string{
        return input.replace(/[^a-zA-Z0-9\-_\.:,; ]/gi, "");
    }
}