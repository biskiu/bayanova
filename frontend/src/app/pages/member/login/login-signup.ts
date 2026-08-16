import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
