import { Component} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NavigationStart, Router } from '@angular/router';
import { Product, display } from '../../../types';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { allergeneImg } from '../../../assets/utils';
import { CopertoService } from '../../services/coperto.service';
import { PagesService } from '../../services/pages.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  
  
  constructor(
    //includo tutti i services che mi servono e anche l'oggetto Router 
    private productService: ProductsService, //servizio prodotti
    private data: DataService, // servizio filtri
    //private cartService: CartService,  servizio carrello
    private router:Router, //classe router
    private pageService: PagesService,
    private renderer: Renderer2
  ) {
    //al cambio di route eseguo il blocco di codice dentro l'if
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        //prendo l'id senza lo slash
        const id = event.url.slice(6);
        try{
          //con il productService faccio una get request al server per avere l'array di prodotti corrispondente alla portata data dall'id e l'oggetto di risposta lo assegno all'array di prodotti
          this.productService.getProducts(`http://localhost:3000/${id}`).subscribe((response) =>{
          this.products = response.items;
          this.products.forEach((product) => { product.quantita = 0})
          //inizialmente assegno a fProducts il valore di products dato che inizialmente non sarà selezionato nessun filtro
          this.fProducts = JSON.parse(JSON.stringify(this.products));

          this.pageService.getPages().subscribe(res=>{
            this.pages = res.pages
          })
          
          
          if(this.pages.indexOf(id) - 1 >= 0){
            let prevProductId:string = this.pages[this.pages.indexOf(id) - 1]
            this.productService.getProducts(`http://localhost:3000/${prevProductId}`).subscribe(res=>{
              this.prevProduct = res.items
              console.log(res.items)
            })
          } 
          if(this.pages.indexOf(id) + 1 <= this.pages.length){
            let nextProductId:string = this.pages[this.pages.indexOf(id) + 1]
            this.productService.getProducts(`http://localhost:3000/${nextProductId}`).subscribe(res=>{
              this.nextProduct = res.items
              console.log(res.items)
            })
          } 

          

          //assegno inizialmente ai prodotti i filtrati i prodotti in modo tale pero da non far puntare le due variabili allo stesso array
      //console.log(this.filters.length)

        if(this.filters.length > 0){
          this.fProducts = JSON.parse(JSON.stringify(this.products));
          // se l'array di filtri contiene filtri eseguo questo codice
          let toRemove: Product[] = []; // dichiaro l'array di prodotti da rimuovere
          this.filters.forEach(filter =>{
            this.fProducts.forEach(product =>{
              if(product.allergeni.includes(filter)){
                toRemove.push(product)
              }
            })
          })
        //console.log(this.products)
        //funzione per rimuovere dai prodotti filtrati tutti i prodotti che sono da rimuovere
        toRemove.forEach(prod =>{
          if(this.fProducts.includes(prod)){
            this.fProducts.splice(this.fProducts.indexOf(prod),1)
            //console.log(this.products)
          }
        })

        /*this.cart.forEach(cartProd =>{
          console.log(this.cart)
          //aggiorno la quantita dei prodotti che gia erano stati inseriti nel carrello
          this.products.forEach(prod =>{
            if(prod.nome === cartProd.nome){
              this.products[this.products.indexOf(prod)].quantita = cartProd.quantita
            }
          })
        })*/
        
        console.log(this.products)
        //in caso l array di filtri è vuoto riassegno ai prodotti filtrati i prodotti normali
      }else if(this.filters.length == 0){
          this.fProducts = this.products
          /*console.log(this.cart)
          this.cart.forEach(cartProd =>{
            console.log(this.cart)
            //aggiorno la quantita dei prodotti che gia erano stati inseriti nel carrello
            this.products.forEach(prod =>{
              if(prod.nome === cartProd.nome){
                this.products[this.products.indexOf(prod)].quantita = cartProd.quantita
              }
            })
          })*/
            
        }

        //console.log('sosss')
        //aggiorno la quantita dei prodotti che gia erano stati inseriti nel carrello ogni volta che viene aggiornata la pagina
        /*this.cart.forEach(cartProd =>{
          console.log(this.cart)
          this.products.forEach(prod =>{
            if(prod.nome === cartProd.nome){
              console.log(prod)
              this.products[this.products.indexOf(prod)].quantita = cartProd.quantita
            }
          })
        })
          */
        })}catch{
          throw Error;
        }

        
      }

      
      
      
    });

    /*this.cartService.getData().subscribe(data =>{
      this.cart = data  
    })
    */
    

    
  }

  allergeneImg = allergeneImg
  //cart: Product[] = []; // array dei prodotti nel carrello


  products: Product[] = []; //array dei prodotti standard
  prevProduct: Product[] = []
  nextProduct: Product[] = []
  pages: string[] = []
  

  filters:string[] = []; //array dei filtri selezionati

  fProducts: Product[] = []; // array dei prodotti filtrati

  //oggetto display per modificare lo stile display della sezione info
  display:display = {
    value: 'display: none',
    product: undefined,
    setFalse(){
      this.value = 'display: none'
    },
    setTrue(product: Product){
      this.value = 'display: inline-flex';
      this.product = product
    }
   }
   
  

  
  
  ngOnInit(){
    //quando il componente viene renderizzato per la prima volta 
    const id = this.router.url.slice(6)
    try{
      this.productService.getProducts(`http://localhost:3000/${id}`).subscribe((response) =>{
      this.products = response.items;
      this.products.forEach((product) => { product.quantita = 0})
      this.fProducts = JSON.parse(JSON.stringify(this.products));
    //console.log(this.fProducts)
    })
    this.pageService.getPages().subscribe(res=>{
      this.pages = res.pages
    })
    
    
    if(this.pages.indexOf(id) - 1 >= 0){
      let prevProductId:string = this.pages[this.pages.indexOf(id) - 1]
      this.productService.getProducts(`http://localhost:3000/${prevProductId}`).subscribe(res=>{
        this.prevProduct = res.items
        console.log(res.items)
      })
    } 
    if(this.pages.indexOf(id) + 1 <= this.pages.length){
      let nextProductId:string = this.pages[this.pages.indexOf(id) + 1]
      this.productService.getProducts(`http://localhost:3000/${nextProductId}`).subscribe(res=>{
        this.nextProduct = res.items
        console.log(res.items)
      })
    } 
    

    
    
  
    //console.log('sosss')
  }catch{
      throw Error;
    }

    
    //ogni volta che i filtri vengono aggiornati filtro i prodotti
    this.data.getData().subscribe(filt =>{
      this.filters = filt
      
      console.log(this.filters.length)
      this.fProducts = JSON.parse(JSON.stringify(this.products));
        if(this.filters.length > 0){
          let toRemove: Product[] = [];
          this.filters.forEach(filter =>{
            this.fProducts.forEach(product =>{
              if(product.allergeni.includes(filter)){
                toRemove.push(product)
              }
            })
          })
        //console.log(this.products)
        toRemove.forEach(prod =>{
          if(this.fProducts.includes(prod)){
            this.fProducts.splice(this.fProducts.indexOf(prod),1)
            //console.log(this.products)
          }
        })

        /*this.cart.forEach(cartProd =>{
            console.log(this.cart)
            //aggiorno la quantita dei prodotti che gia erano stati inseriti nel carrello
            this.products.forEach(prod =>{
              if(prod.nome === cartProd.nome){
                this.products[this.products.indexOf(prod)].quantita = cartProd.quantita
              }
            })
          })*/
        console.log(this.products)
      }else if(this.filters.length == 0){
          this.fProducts = JSON.parse(JSON.stringify(this.products));
          console.log(this.products)
          /*this.cart.forEach(cartProd =>{
            console.log(this.cart)
            this.products.forEach(prod =>{
              if(prod.nome == cartProd.nome){
                this.fProducts[this.products.indexOf(prod)].quantita = cartProd.quantita
              }
            })
          })*/
        }
    })

    //questa è la porzione di codice che risulta problematica
    //----------------------------------------
    //ogni volta che genero nuovamente il componente richiedo il carrello e aggiorno le quantita nei prodotti
    /*this.cartService.getData().subscribe(data =>{
      //console.log('sos')
      this.cart = data
      this.cart.forEach(cartProd =>{
        this.products.forEach(prod =>{
          if(prod.nome === cartProd.nome){
            this.products[this.products.indexOf(prod)] = cartProd
          }
        })
      })
      console.log(data)
      
    })
    // ------------------------------
    this.cart.forEach(cartProd =>{
      this.products.forEach(prod =>{
        if(prod.nome === cartProd.nome){
          this.products[this.products.indexOf(prod)] = cartProd
        }
      })
    })
    */
    
  }
  //funzione che aumenta la quantita di un prodotto invia il prodotto con la quantita al carrello
   /*addOne(index:number){
    this.products[index].quantita++;
    this.fProducts[index] = this.products[index]
    if(this.cart.includes(this.products[index])){
      this.cart[this.cart.indexOf(this.products[index])] = this.products[index]
    }else{
      this.cart.push(this.products[index])
    }
    this.cartService.sendData(this.cart)
   }
   */
   //funzione che diminuisce la quantita di un prodotto invia il prodotto con la quantita al carrello oppure lo toglie se la quantita è 0
   /*minusOne(index:number){
    
      if(this.products[index].quantita > 0){
        this.products[index].quantita--;
    this.fProducts[index] = this.products[index]
        if(this.products[index].quantita == 0){
          this.cart.forEach(cartProd =>{
            if(this.products[index].nome == cartProd.nome){
              this.cart.splice(this.cart.indexOf(cartProd), 1)
            }
          })
        }else{
          this.cart[this.cart.indexOf(this.products[index])] = this.products[index]
        }
        
      }
      this.cartService.sendData(this.cart)
      console.log(this.cart)
   }
   */
}
