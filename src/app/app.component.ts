import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            MatToolbarModule,
            MatIconModule,
            RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ZeneszBlog';
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("loggedInUser") != null;
  }
}
