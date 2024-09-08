import { Product } from "../types"



export function allergeneImg(allergene:string){
  return `http://localhost:3000/img/${allergene}.png`;
}
export function pageRoute(index: number, pages: string[]){
  return   pages[index]
}
export class newProduct {
  nome: string;
  ingredienti: string;
  prezzo: string;
  allergeni: string[];
  quantita: number;
  img: string;
  constructor(nome: string, ingredienti: string, prezzo: string, allergeni: string[]){
    this.nome = nome
    this.ingredienti  = ingredienti
    this.prezzo = prezzo
    this.allergeni = allergeni
    this.quantita = 0
    this.img = '#'
  }
}