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
  ){}
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirm: new FormControl('',[Validators.required, Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')])
  },  { validators: this.customPasswordMatching.bind(this) })

  customPasswordMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { passwordMismatchError: true };
  }



  handleSubmit(){
    this.authService.register(this.registerForm.value.email ?? '', this.registerForm.value.password ?? '',this.registerForm.value.confirm ?? '').subscribe(res =>{
      console.log('fatto' + res)
    })
    this.router.navigate(['..', 'menu', 'allergeni'])
  }
}
