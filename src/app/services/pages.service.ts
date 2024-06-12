import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pages } from '../../types';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private apiService: ApiService,
    private http: HttpClient
  ) { }

  getPages = (url: string): Observable<Pages> =>{
    return this.apiService.get(url, {
      responseType: 'json',
    })
  }

  postPage = (url:string, route: string): Observable<object> =>{
    return this.http.post(url, {name: route});
  }
  deletePage = (url:string, route:string): Observable<object> =>{
    return this.http.delete(url, {
      body: {name: route}
    })
  }
}
