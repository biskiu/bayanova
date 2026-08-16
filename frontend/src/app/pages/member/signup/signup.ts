import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signup',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  username = '';
  password = '';
  acceptsTerms = false;

  onSignUp(): void {
    // Handle sign-up logic here
    console.log('Signing up:', { username: this.username, acceptsTerms: this.acceptsTerms });
  }
}
