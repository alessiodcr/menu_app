import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl('')
  })
  handleSubmit(){
    this.authService.register(this.registerForm.value.email ?? '', this.registerForm.value.password ?? '',this.registerForm.value.confirm ?? '').subscribe(res =>{
      console.log('fatto' + res)
    })
    this.router.navigate(['..', 'menu', 'allergeni'])
  }
}
