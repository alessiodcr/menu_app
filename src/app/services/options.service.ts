import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { options } from '../../types';
@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(
    private http: HttpClient
  ) { }

  getOptions(): Observable<options>{
    return this.http.get<options>('http://localhost:3000/options')
  }
  postOptions( options:options): Observable<options>{
    return this.http.post<options>('http://localhost:3000/options', options)
  }
}
