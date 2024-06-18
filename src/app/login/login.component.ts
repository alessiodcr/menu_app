import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, RequiredValidator, FormGroupName, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  loginForm = new FormGroup({
    email: new FormControl('',),
    password: new FormControl('', )
  },)

  /*submitForm(){
    this.loginForm.
  }*/
    handleSubmit(){
      this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '').subscribe(res=>{
        localStorage.setItem('user', JSON.stringify(res))
        this.router.navigate(['config/menu/allergeni'])
      }, err =>{
        
      }
      )
    }
}
