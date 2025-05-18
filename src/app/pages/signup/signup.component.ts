import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

import {User} from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    username: new FormControl('', [Validators.required]),
  });
  
  signupError = '';
  showForm = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Kérem javítsa ki hibákat a regisztráció előtt.';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;
    
    if (password !== rePassword) {
      this.signupError = 'Nem egyeznek a jelszavak.';
      return;
    }

    this.showForm = false;

    const userData: Partial<User> = {
      name: this.signUpForm.get('username')?.value || '',
      email: this.signUpForm.value.email || '',
      groups: [],
      role: "reader",
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService.signUp(email, pw, userData, )
      .then(userCredential => {
        console.log('Sikeres regisztrálás:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
        this.showForm = true;
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'Az email már használatban van.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Helytelen email.';
            break;
          case 'auth/weak-password':
            this.signupError = 'A jelszónak legalább 6 karakter hosszúnak kell lennie.';
            break;
          default:
            this.signupError = 'Ismeretlen hiba történt. Kérjük, próbálja újra később.';
        }
      });
  }
}