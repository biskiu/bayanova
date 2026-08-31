import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class AdminLogin {
  username = '';
  password = '';
  rememberMe = false;

  constructor(private readonly router: Router) {}

  onSignIn(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
