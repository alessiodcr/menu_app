import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { account } from '../../types';
import { ENV } from '../../env/variables';
@Injectable({
  providedIn: 'root'
})
export class SuspensionService {

  constructor(
    private http: HttpClient
  ) { }

  suspend(account: account){
    return this.http.post(ENV.server + 'suspend', account)
  }
  riabilita(account:account){
    return this.http.post(ENV.server + 'riabilita', account)
  }
}
