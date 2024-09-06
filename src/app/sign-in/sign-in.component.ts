import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  ) { }
  errorMsg = '';

  registerForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required, Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')])
  })





  handleSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value.nome ?? '', this.registerForm.value.email ?? '', this.registerForm.value.password ?? '', this.registerForm.value.confirm ?? '').subscribe(res => {

        console.log(res)
        this.router.navigate(['..', 'home'])


      }, err => {
        this.errorMsg = err.error
      }

      )
    }


  }
}
