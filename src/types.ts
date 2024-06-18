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
    primario: number,
    secondario: number,
    terziario: number,
    immagine: boolean,
    piccoli: string | number,
    grandi: string | number
}
export interface account{
    email: string,
    password: string
}
export interface accounts{
    users: account[]
}