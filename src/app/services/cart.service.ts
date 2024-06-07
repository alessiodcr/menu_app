import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //dichiaro il subject per immagazzinare l'array di prodotti
  private subject = new Subject<Product[]>();
  //funzione per aggiornare l'array
  sendData(cart: Product[]){
    this.subject.next(cart);
  }
  //funzione per svuotare l'array
  clearData(){
    this.subject.next([]);
  }
  //funzione per ricevere l'array
  getData(): Observable<Product[]>{
    return this.subject.asObservable();
  }
}
