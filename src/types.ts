import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
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
export type Portate = Record<string, Product[]>;

export interface Products {
    items: Product[]
}


export interface display {
    value: string;
    setFalse: () => void;
    setTrue: (product: Product) => void;
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
export interface Pages {
    pages: string[]
}
export interface Coperto {
    coperto: string
}
export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    id: number;
}
export interface options {
    primario: string,
    secondario: string,
    terziario: string,
    immagine: boolean,
    coperto: boolean,
    piccoli: string,
    grandi: string,
    grandi2: string,
    font1: string,
    font2: string,
    font3: string

}
export interface account {
    class: string,
    nome: string,
    email: string,
    password: string,
    status: string
    date?: string;
}
export interface accounts {
    users: account[]
}


export type headers = Record<string, string>