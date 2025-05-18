import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from './shared/services/user.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            MatToolbarModule,
            MatIconModule,
            RouterLink,
            MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'zeneszblog';
  isLoggedIn: boolean = false;
  role: string = "reader";
  private authSubscription?: Subscription;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });

    this.userService.getCurrentUserRole().subscribe(role => {
      if (role) {
        this.role = role;
      }
    })
  }
}
