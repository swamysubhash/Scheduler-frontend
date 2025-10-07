import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../features/services/auth';
import { Router } from '@angular/router';
import { Alerts } from '../../features/services/alerts';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private alerts: Alerts) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.authService.setUser(response.user);
          this.router.navigate(['/schedules']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.alerts.show('Login failed. Please check your credentials and try again.', 'error');
        }
      });

    }
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
