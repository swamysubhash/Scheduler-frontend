import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../features/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
  
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Registration failed:', err);
        alert('Something went wrong! Try again.');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
