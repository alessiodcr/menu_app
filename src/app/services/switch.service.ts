import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ENV } from '../../env/variables';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isOn = new BehaviorSubject<boolean>(true);

  getStatusFromServer(){
    this.http.get<any>(ENV.server + 'isOn').subscribe(res=>{
      this.isOn.next(res.menu)
    })
    console.log()
  }
  getStatus(){
    return this.isOn.asObservable()
  }

  switch(): any{
    this.http.post(ENV.server + 'switch', {}, {
      withCredentials: true
    }).subscribe(res=>{
      console.log(res)
    })
  }


}
