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
import { ProfileObject } from '../../shared/constant';

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
  success = false;
  showForm = true;

  profiles = ProfileObject;

  constructor(private router: Router) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Hiba a megadott adatokban.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    let lastId: number = 1;
    this.profiles.forEach(element => {
      lastId = Number(element.id);
    });

    const newUser: User = {
      id: lastId++,
      name: this.signUpForm.value.username || '',
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      groups: [],
      role: "reader"
    };

    console.log('New user:', newUser);

    this.showForm = false
    this.success = true;

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }
}