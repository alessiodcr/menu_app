import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Products } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProducts = (url: string): Observable<Products> =>{
    return this.apiService.get(url, {
      responseType: 'json',
    })
  }
}
