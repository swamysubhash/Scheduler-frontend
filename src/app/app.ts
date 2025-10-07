import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './features/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  isLoggedIn = false;
  user: any;
  protected readonly title = signal('Scheduler');

  constructor(private router: Router, private auth: Auth) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = !!user;
        this.user = user;
      }
      else
        this.isLoggedIn = false;
    });
  }

  newScheduler() {
    this.router.navigate(['/schedules/new']);
  }

  logout() {
    this.auth.clearToken();
    this.router.navigate(['/login']);
  }
}
