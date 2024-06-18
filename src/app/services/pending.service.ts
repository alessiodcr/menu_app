import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { account, accounts } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(
    private http: HttpClient
  ) { }

  getPending(): Observable<accounts>{
    return this.http.get<accounts>('http://localhost:3000/pending')
  }
  approve(account: account): Observable<account>{
    return this.http.post<account>('http://localhost:3000/pending', account)
  }
  reject(account: account): Observable<account>{
    return this.http.delete<account>('http://localhost:3000/pending', {
      body: {
        account: account
      }
    })
  }
}
