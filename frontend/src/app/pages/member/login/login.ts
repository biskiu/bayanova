import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  onSignIn(): void {
    // Handle sign-in logic here
    console.log('Signing in:', { username: this.username, rememberMe: this.rememberMe });
  }
}
