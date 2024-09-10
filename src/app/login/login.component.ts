import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ENV } from '../../env/variables';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  errorMsg: string = ''
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')])
  },)
  env = ENV
  /*submitForm(){
    this.loginForm.
  }*/
    handleSubmit(){
      this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '').subscribe((res: any)=>{
        if(!res.message){
          localStorage.setItem('user', JSON.stringify(res))
        this.router.navigate(['config/options'])
      }else{
        this.errorMsg = res.message
      }
      }, err =>{
        this.errorMsg = err.error
      }
      )
    }
}
