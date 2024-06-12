import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product, Products } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService,
    private http: HttpClient
  ) { }

  getProducts = (url: string): Observable<Products> =>{
    return this.apiService.get(url, {
      responseType: 'json',
    })
  }

  addProduct(product: Product, url:string){
    return this.http.post(url, product)
  }

  deleteProduct(product: Product, url:string){
    return this.http.delete(url, {
      body: product
    })
  }

  putProduct(prevProduct: Product, newProduct: Product, url:string){
    return this.http.put(url, {
      prev: prevProduct,
      new: newProduct
    })
  }
}
