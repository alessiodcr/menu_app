import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
export enum State{
    "allergeni" = 0,
    "antipasti" = 1,
    "primi" = 2,
    "secondi" = 3,
    "pizzeria" = 4,
    "birre" = 5,
    "bibite" = 6
}
export interface Options{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}
export interface Products {
    items: Product[];
}

export interface display{
    value: string;
    setFalse: ()=>void;
    setTrue: (product:Product)=>void;
    product?: Product;
}
export interface Product {
    nome: string;
        ingredienti: string;
        img: string;
        prezzo: string;
        quantita: number;
        allergeni: string[];
}
export interface Pages{
    pages: string[]
}
export interface Coperto{
    coperto: number
}
export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; 
    id: number;
}
export interface options{
    primario: string,
    secondario: string,
    terziario: string,
    immagine: boolean,
    piccoli: string,
    grandi: string,
    grandi2: string,
    font1: string,
    font2: string,

}
export interface account{
    class: string,
    email: string,
    password: string,
    status: string
}
export interface accounts{
    users: account[]
}
