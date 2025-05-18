import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  loginError: string = "";
  authSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  login():void {
    if (this.loginForm.get("email")?.invalid) {
      this.loginError = 'Kérlek adj meg egy valós e-mailt.';
      return;
    }
    
    if (this.loginForm.get("password")?.invalid) {
      this.loginError = 'A jelszónak legalább 6 karakter hosszúnak kell lennie.';
      return;
    }

    const emailValue = this.loginForm.get("email")?.value || '';
    const passwordValue = this.loginForm.get("password")?.value || '';

    this.authService.signIn(emailValue, passwordValue)
      .then(userCredential => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Login error:', error);
        
        switch(error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nincs fiók ezzel az e-mail címmel';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Hibás e-mail vagy jelszó.';
            break;
          default:
            this.loginError = 'Bejelentkezési hiba. Kérlek próbáld újra később.';
        }
      });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
