import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {User} from '../../shared/models/User';
import { ProfileObject } from '../../shared/constant';

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
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  loginError: boolean = false;

  profiles = ProfileObject;

  constructor(private router: Router) { }

  login():void {
    let siker = false;

    this.profiles.forEach(profile => {
      if (profile.email == this.loginForm.get("email")?.value && profile.password == this.loginForm.get("password")?.value) {
        siker = true;
        localStorage.setItem('loggedInUser', String(profile.id));

        window.location.href = "/home";
      }
    });

    this.loginError = !siker;
  }
}
