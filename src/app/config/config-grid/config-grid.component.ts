import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../types';
import { NavigationStart, Router } from '@angular/router';
import { allergeneImg } from '../../../assets/utils';
import { ProductPostService } from '../../services/product-post.service';

@Component({
  selector: 'app-config-grid',
  standalone: true,
  imports: [],
  templateUrl: './config-grid.component.html',
  styleUrl: './config-grid.component.css'
})
export class ConfigGridComponent {
  constructor(
    private productService: ProductsService,
    private router: Router,
    private postProductService: ProductPostService
  ){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        //prendo l'id senza lo slash
        const id = event.url.slice(8);
        try{
          //con il productService faccio una get request al server per avere l'array di prodotti corrispondente alla portata data dall'id e l'oggetto di risposta lo assegno all'array di prodotti
          this.productService.getProducts(`http://localhost:3000/${id}`).subscribe((response) =>{
          this.products = response.items;
          this.products.forEach((product) => { product.quantita = 0})

        })}catch{
          throw Error;
        }

        
      }

      
      
      
    });
  }
  allergeneImg = allergeneImg
  products: Product[] = []

  ngOnInit(){
    const id = this.router.url.slice(8)
    this.productService.getProducts(`http://localhost:3000/${id}`).subscribe(data =>{
      this.products = data.items
    })
  }


  postProduct(product: Product){
    const url = "http://localhost:3000/#"
    return this.postProductService.addProduct(product, url)
  }
}
