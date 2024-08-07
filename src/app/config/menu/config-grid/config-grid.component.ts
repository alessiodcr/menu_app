import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../../types';
import { NavigationStart, Router } from '@angular/router';
import { allergeneImg, } from '../../../../assets/utils';
import { __values } from 'tslib';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImgUploadService } from '../../../services/img-upload.service';
@Component({
  selector: 'app-config-grid',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './config-grid.component.html',
  styleUrl: './config-grid.component.css'
})
export class ConfigGridComponent {

  newProductForm = new FormGroup({
    nome: new FormControl(''),
    ingredienti: new FormControl(''),
    prezzo: new FormControl(''),
    image: new FormControl(null),
    cereali: new FormControl(false),
    crostacei: new FormControl(false),
    uova: new FormControl(false),
    pesce: new FormControl(false),
    arachidi: new FormControl(false),
    soia: new FormControl(false),
    latte: new FormControl(false),
    fruttaAGuscio: new FormControl(false),
    sedano: new FormControl(false),
    senape: new FormControl(false),
    sesamo: new FormControl(false),
    Asolforica: new FormControl(false),
    lupini: new FormControl(false),
    molluschi: new FormControl(false),
    funghi: new FormControl(false),
  })

  
  constructor(
    private productService: ProductsService,
    private router: Router,
    private uploadImg: ImgUploadService
  ){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        //prendo l'id senza lo slash
        const id = event.url.slice(13);
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
    const id = this.router.url.slice(13)
    this.productService.getProducts(`http://localhost:3000/${id}`).subscribe(data =>{
     this.products = data.items
      console.log('fatto')
    })
  }




 returnUrl(){
  const id = this.router.url.slice(13)
  return `http://localhost:3000/${id}`
 }

 




deleteProduct(product:Product){
  const id = this.router.url.slice(13)
  this.productService.deleteProduct(product, `http://localhost:3000/${id}`).subscribe(data =>{
    console.log('cancellato')
    console.log(data)
  }
  )
}


handlePost(){
  let product:Product = {
    nome: this.newProductForm.value.nome ?? '',
    ingredienti: this.newProductForm.value.ingredienti ?? '',
    prezzo: '€' + this.newProductForm.value.prezzo ?? '',
    quantita: 0,
    img: `http://localhost:3000/img/${this.newProductForm.value.nome?.replace(/\s/g, "") + (this.newProductForm.value.image as any)?.name.slice((this.newProductForm.value.image as any)?.name.indexOf('.'))}` ,
    allergeni:[]
  }
  this.uploadImg.uploadImg(this.newProductForm.value.image ?? null , product.nome.replace(/\s/g, ""))?.subscribe(res=>{},err=>{
    console.log(err)
  })
  this.allergeni.forEach(allergene =>{
    if(this.newProductForm.value[allergene as keyof typeof this.newProductForm.value]){
      product.allergeni.push(allergene)
    }
  })
  const id = this.router.url.slice(13)
  this.productService.addProduct(product,  `http://localhost:3000/${id}`).subscribe(data=>{
    console.log(data)
    console.log('fatto')
  })
  this.display.toggle()
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
  
}
 editsetTrue(product:Product){
    this.displayEdit.product = product
    this.displayEdit.value = '' 
    this.setInitialValue()
  }
  editsetFalse(){
    this.displayEdit.value = 'display: none'
  }

  onImagePicked(event: Event) {
    const file = (event.target as any).files[0];
    this.newProductForm.patchValue({ image: file});
  }

setInitialValue(){
  this.editProductForm.controls['nome'].setValue(this.displayEdit.product.nome)
  this.editProductForm.controls['ingredienti'].setValue(this.displayEdit.product.ingredienti)
  this.editProductForm.controls['prezzo'].setValue(this.displayEdit.product.prezzo)
  this.editProductForm.controls['cereali'].setValue(this.displayEdit.product.allergeni.includes('cereali'))
  this.editProductForm.controls['crostacei'].setValue(this.displayEdit.product.allergeni.includes('crostacei'))
  this.editProductForm.controls['uova'].setValue(this.displayEdit.product.allergeni.includes('uova'))
  this.editProductForm.controls['pesce'].setValue(this.displayEdit.product.allergeni.includes('pesce'))
  this.editProductForm.controls['arachidi'].setValue(this.displayEdit.product.allergeni.includes('arachidi'))
  this.editProductForm.controls['soia'].setValue(this.displayEdit.product.allergeni.includes('soia'))
  this.editProductForm.controls['latte'].setValue(this.displayEdit.product.allergeni.includes('latte'))
  this.editProductForm.controls['fruttaAGuscio'].setValue(this.displayEdit.product.allergeni.includes('fruttaAGuscio'))
  this.editProductForm.controls['sedano'].setValue(this.displayEdit.product.allergeni.includes('sedano'))
  this.editProductForm.controls['senape'].setValue(this.displayEdit.product.allergeni.includes('senape'))
  this.editProductForm.controls['sesamo'].setValue(this.displayEdit.product.allergeni.includes('sesamo'))
  this.editProductForm.controls['Asolforica'].setValue(this.displayEdit.product.allergeni.includes('Asolforica'))
  this.editProductForm.controls['lupini'].setValue(this.displayEdit.product.allergeni.includes('lupini'))
  this.editProductForm.controls['molluschi'].setValue(this.displayEdit.product.allergeni.includes('molluschi'))
  this.editProductForm.controls['funghi'].setValue(this.displayEdit.product.allergeni.includes('funghi'))
}




editProductForm = new FormGroup({
  nome: new FormControl(),
  ingredienti: new FormControl(),
  prezzo: new FormControl(),
  img: new FormControl(null),
  cereali: new FormControl(),
  crostacei: new FormControl(),
  uova: new FormControl(),
  pesce: new FormControl(),
  arachidi: new FormControl(),
  soia: new FormControl(),
  latte: new FormControl(),
  fruttaAGuscio: new FormControl(),
  sedano: new FormControl(),
  senape: new FormControl(),
  sesamo: new FormControl(),
  Asolforica: new FormControl(),
  lupini: new FormControl(),
  molluschi: new FormControl(),
  funghi: new FormControl()
})




  onImagePut(event:any){
    const file = event.target.files[0]
    this.editProductForm.patchValue({img: file})
  } 


  handlePut(){
    let prevProduct: Product = this.displayEdit.product
    let newProduct:Product = {
      nome: this.editProductForm.value.nome,
      ingredienti: this.editProductForm.value.ingredienti,
      prezzo:   this.editProductForm.value.prezzo,
      quantita: 0,
      img: '',
      allergeni:[]
    }
    if(this.editProductForm.value.img){
      newProduct.img =`http://localhost:3000/img/${this.editProductForm.value.nome?.replace(/\s/g, "") + (this.editProductForm.value.img as any)?.name.slice((this.editProductForm.value.img as any)?.name.indexOf('.'))}`
      this.uploadImg.uploadImg(this.editProductForm.value.img ?? null, newProduct.nome.replace(/\s/g, ""))?.subscribe(res=>{},
        err=>{
          console.log(err)
        }
      )
    }else{
      newProduct.img = prevProduct.img
    }
    this.allergeni.forEach(allergene =>{
      if(this.editProductForm.value[allergene as keyof typeof this.editProductForm.value]){
        newProduct.allergeni.push(allergene)
      }
    })
    const id = this.router.url.slice(13)
    this.productService.putProduct(prevProduct, newProduct, `http://localhost:3000/${id}`).subscribe(data=>{
      console.log(data)
      console.log('modificato')
    })
    this.editsetFalse()
    console.log(newProduct.nome)
  }
  
}
