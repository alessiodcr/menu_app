import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { account, accounts } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<accounts>{
    return this.http.get<accounts>('http://localhost:3000/users')
  }
  removeAccount(account: account){
    return  this.http.delete<account>('http://localhost:3000/users', {
      body: {
        account: account
      }
    })
  }
}
