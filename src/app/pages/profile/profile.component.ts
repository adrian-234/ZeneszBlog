import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private userService: UserService) {}

  updateForm = new FormGroup({
      username: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
    }
  );

  user!: User | null;
  private subscription: Subscription | null = null;
  
  ngOnInit(): void {
    this.subscription = this.userService.getLoggedInUser().subscribe({
      next: (data) => {this.user = data},
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
      }
    });
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
