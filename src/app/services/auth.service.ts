import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { accounts } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private environment = {
    API_EndPoint_aut: ''
  }
  constructor(private http: HttpClient) {}

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

  // Login
  login(email: string, password: string) {
    // return this.http.post('http://localhost:8000/api/login', {
    //   email: email,
    //   password: password,
    // });

    return this.http.post('http://localhost:3000/login', {
      email: email,
      password: password,
    });


  }

  // User Info
  user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.get(this.environment.API_EndPoint_aut+'user', {
      headers: headers,
    });
  }

  // Logout
  logout(){
    localStorage.removeItem('user')
  }
  /*logout(allDevice: boolean){
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.environment.API_EndPoint_aut+'logout', {allDevice:allDevice}, {headers:headers});
  }*/

  // Register
  register(email:string, password:string, password_confirmation:string){
    const data={
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
