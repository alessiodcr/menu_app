import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Coperto } from '../../types';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../env/variables';

@Injectable({
  providedIn: 'root'
})
export class CopertoService {

  constructor(private apiService: ApiService,
    private http: HttpClient
  ) { }

  getCoperto = (): Observable<Coperto> =>{
    return this.apiService.get("http://localhost:3000/coperto", {
      responseType: 'json',
    })
  }


  postCoperto = (coperto: string): Observable<any> =>{
    return this.http.post(ENV.server + 'coperto', {coperto}, {
      withCredentials: true
    })
  }
}
