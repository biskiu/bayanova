import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, InputTextModule, PasswordModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';
  rememberMe = false;

  constructor(private readonly router: Router) {}

  onSignIn(): void {
    // Authentication will be added later. For now, continue to the member dashboard.
    this.router.navigate(['/member/dashboard']);
  }
}
