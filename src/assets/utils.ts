import { Product } from "../types"

export function prodToCart(cart: Product[], products:Product[]){
    cart.forEach(cartProd =>{
        products.forEach(prod =>{
          if(prod.nome === cartProd.nome){
            products[products.indexOf(prod)] = cartProd
          }
        })
      })
}


export function allergeneImg(allergene:string){
  return `assets/${allergene}.png`;
 }
export function pageRoute(index: number, pages: string[]){
  return   pages[index]
}