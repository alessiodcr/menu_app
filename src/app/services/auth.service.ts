import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { accounts } from '../../types';
//import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private accountClass = new BehaviorSubject<string>('ciao');
  private environment = {
    API_EndPoint_aut: ''
  }
  constructor(private http: HttpClient,
    //private cookieService: CookieService
  ) {}

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }
  // Status
  status() {
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
       console.log('User not lgged in !!');
    } else {
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      /*if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
         console.log('Token Expires!!');
      }*/
     this.isLoggedIn.next(true)
    }
    return this.isLoggedIn.asObservable();
  }

  class(){
    const localData: any = localStorage.getItem('user')
    //const token = this.cookieService.get('jwt');
    if (!localData /*|| token*/  ) {
      this.isLoggedIn.next(false);
       console.log('User not lgged in !!');
    } else {
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      /*if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
         console.log('Token Expires!!');
      }*/
     this.accountClass.next(userObj['class'])
    }
    return this.accountClass.asObservable();
  }

  // Login
  login(email: string, password: string) {
    // return this.http.post('http://localhost:8000/api/login', {
    //   email: email,
    //   password: password,
    // });

    return this.http.post('http://localhost:3000/login', {
      email: email,
      password: password,
    },
  {
    withCredentials: true
  });


  }

  // Logout
  logout(){
    localStorage.removeItem('user')
  }


  // Register
  register(nome: string,email:string, password:string, password_confirmation:string){
    const data={
      nome: nome,
      email:email,
      password:password,
      confirm:password_confirmation,
    }
    return this.http.post('http://localhost:3000/register', data);
  }

  // Forgot Pass
  forgot(email:string){
    return this.http.post(this.environment.API_EndPoint_aut+'forgot', {email:email});
  }

  // Reset Pass
  reset(token:string, password:string,password_confirmation:string){

    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post(this.environment.API_EndPoint_aut+'reset', data);
  }


  
  
}
