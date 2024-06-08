import { Injectable } from '@angular/core';
import { Product } from '../../types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductPostService {
  constructor(
    private http: HttpClient
  ) {
    
  }
  addProduct(product: Product, url:string): Observable<Product>{
    return this.http.post<Product>(url, product)
  }
}
