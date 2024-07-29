import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // Clear any stale authentication data
      this.authService.logout();
    }
    if (
      !this.authService.isLoggedInProf() &&
      localStorage.getItem('role') === 'professeur'
    ) {
      this.authService.logout();
    }
  }
}
