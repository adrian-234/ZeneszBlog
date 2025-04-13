import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { ProfileObject } from '../../shared/constant';
import { User } from '../../shared/models/User';


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
export class ProfileComponent implements OnInit{
  updateForm = new FormGroup({
      username: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      Npassword: new FormControl('', [Validators.minLength(6)]),
      password: new FormControl('', [Validators.minLength(6)]),
    }
  );

  
  currentUser!: User;
  isLoggedIn = false;
  
  ngOnInit(): void {
    if (localStorage.getItem("loggedInUser") != null) {
      for(let i = 0; i < ProfileObject.length; i++) {
        if (ProfileObject[i].id == localStorage.getItem("loggedInUser")) {
          this.currentUser = {
            'id': Number(ProfileObject[i].id),
            'name': ProfileObject[i].name,
            'email': ProfileObject[i].email,
            'password': ProfileObject[i].password,
            'groups': ProfileObject[i].groups,
            'role': ProfileObject[i].role 
          }
          this.isLoggedIn = true;
        }
      }
    }
  }


  update() {
    if (this.updateForm.value["password"] == this.currentUser.password) {
      console.log("Adatok módosítva");
    } else {
      console.log("Rossz jelszó lett megadava.");
    }
  }

  logOut() {
    localStorage.removeItem("loggedInUser");
    location.href = "/home";
  }
}
