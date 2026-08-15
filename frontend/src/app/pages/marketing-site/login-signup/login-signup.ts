import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.scss',
})
export class LoginSignup {
  username = '';
  password = '';
  rememberMe = false;

  onSignIn(): void {
    // Handle sign-in logic here
    console.log('Signing in:', { username: this.username, rememberMe: this.rememberMe });
  }
}