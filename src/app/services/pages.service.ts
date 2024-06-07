import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pages } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private apiService: ApiService) { }

  getPages = (url: string): Observable<Pages> =>{
    return this.apiService.get(url, {
      responseType: 'json',
    })
  }
}
