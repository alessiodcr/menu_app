import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../types';
import { NavigationStart, Router } from '@angular/router';
import { allergeneImg, } from '../../../assets/utils';
import { __values } from 'tslib';
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
 
  display = {
    value: '',
    formValue: 'display: none',
    toggle(){
      if(!(this.value)){
        this.value = 'display: none'
        this.formValue = ''
      }else{
        this.value = ''
        this.formValue =  'display: none'
      }
    } 
  }
  allergeneImg = allergeneImg
  products: Product[] = []
  allergeni: string[]= ['cereali', 'crostacei', "uova","pesce", "arachidi","soia","latte","fruttaAGuscio","sedano","senape","sesamo","Asolforica","lupini","molluschi", "funghi"]

  ngOnInit(){
    const id = this.router.url.slice(8)
    this.productService.getProducts(`http://localhost:3000/${id}`).subscribe(data =>{
      this.products = data.items
      console.log('fatto')
    })
  }

 returnUrl(){
  const id = this.router.url.slice(8)
  return `http://localhost:3000/${id}`
 }

 handleSubmit(){
  let newAllergeni: string[] = []
  this.allergeni.forEach(allergene =>{
    let element: any = document.querySelector(`#${allergene}`)
    if(element.checked){
      newAllergeni.push(element.getAttribute('value') as string)
    }
  })
  let nome = (document.querySelector('#nome') as any).value as string
  let ingredienti = (document.querySelector('#ingredienti') as any).value as string
  let prezzo = (document.querySelector('#prezzo') as any).value as string
  let product: Product = {
    nome: nome,
    ingredienti: ingredienti,
    prezzo: prezzo,
    img:'',
    quantita: 0,
    allergeni: newAllergeni
  }
  const id = this.router.url.slice(8);
  this.productService.addProduct(product,`http://localhost:3000/${id}`).subscribe(data =>{
    console.log('fatto')
    console.log(data)
  });
  
  (document.querySelector('#prezzo') as any).value = null;
  (document.querySelector('#ingredienti') as any).value = null;
  (document.querySelector('#nome') as any).value = null;
  this.display.toggle()
}


deleteProduct(product:Product){
  const id = this.router.url.slice(8)
  this.productService.deleteProduct(product, `http://localhost:3000/${id}`).subscribe(data =>{
    console.log('cancellato')
    console.log(data)
  }
  )
}




displayEdit = {
  value: 'display: none' ,
  product: {
    nome:'',
    ingredienti:'',
    prezzo: '',
    quantita: 0,
    img: '',
    allergeni: ['']
  },
  setTrue(product:Product){
    this.product = product
    this.value = ''
  },
  setFalse(){
    this.value = 'display: none'
  }
}


  handlePut(){
    let prev = this.displayEdit.product;
    let nomeElement = document.querySelector('#editNome') as any
    let ingredientiElement = document.querySelector('#editIngredienti') as any
    let prezzoElement = document.querySelector('#editPrezzo') as any
    let newAllergeni: string[] = []
    this.allergeni.forEach(allergene =>{
      let element: any = document.querySelector(`#edit${allergene}`)
      if(element.checked){
        newAllergeni.push(element.getAttribute('value') as string)
      }
    })
    let product: Product = {
      nome: nomeElement.value as string,
      ingredienti: ingredientiElement.value as string,
      prezzo: prezzoElement.value as string,
      allergeni: newAllergeni,
      img:'assets/pasta.jpeg',
      quantita: 0
    }
    console.log(prev)
    console.log(product)
    const id = this.router.url.slice(8)
    this.productService.putProduct(prev, product, `http://localhost:3000/${id}`).subscribe(data=>{
      console.log(data)
      console.log('modificato')
    })
    this.displayEdit.setFalse()
  }
}
