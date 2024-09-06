import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from '../../env/variables';
import { headers } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(
    private http: HttpClient
  ) { }

  getHeaders(): Observable<headers>{
    return this.http.get<headers>(ENV.server + 'headers')
  }

  postHeader(header: string, id:string): Observable<any>{
    return this.http.post(ENV.server + 'headers/' + id, {header}, {
      withCredentials: true
    })
  }
  


}
