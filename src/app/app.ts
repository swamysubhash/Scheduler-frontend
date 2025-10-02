import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Scheduler');

  constructor(private router: Router) {}

  newScheduler() {
    this.router.navigate(['/schedules/new']);
  }
}
