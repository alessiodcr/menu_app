import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Coperto } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CopertoService {

  constructor(private apiService: ApiService) { }

  getCoperto = (): Observable<Coperto> =>{
    return this.apiService.get("http://localhost:3000/coperto", {
      responseType: 'json',
    })
  }
}
