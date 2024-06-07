import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(
    private cartService: CartService
  ){}
  //dichiaro l'array di prodotti
  products: Product[] = [];
  //una volta renderizzato il prodotto faccio in modo che venga chiamato il metodo get del cartService per ricevere gli elementi del carrello
  ngOnInit(){
    this.cartService.getData().subscribe(cart =>{
      this.products = cart
    }
    )
  }

  //dichiaro l'oggetto 'display' al cui interno ce value ovvero il valore di display e il metodo toggle() che ha il compito di dare a value un valore di display: block in caso il valore sia display: none, e di dare display: none in caso sia impostato su display: block
  //in questo modo posso fare in modo che il carrello appaia e scompaia
  display = {
    value: 'display: none',
    toggle(){
      if(this.value === 'display: none'){
        this.value = 'display: block';
      }else if(this.value === 'display: block'){
        this.value = 'display: none';
      }
    }
   }
}
