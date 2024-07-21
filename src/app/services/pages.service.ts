import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pages } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private apiService: ApiService,
    private http: HttpClient
  ) { }

  getPages = (): Observable<Pages> =>{
    return this.apiService.get('http://localhost:3000/pages', {
      responseType: 'json',
    })
  }

  postPage = ( route: string): Observable<object> =>{
    return this.http.post('http://localhost:3000/pages', {name: route});
  }
  deletePage = (route:string): Observable<object> =>{
    return this.http.delete('http://localhost:3000/pages', {
      body: {name: route}
    })
  }
}
