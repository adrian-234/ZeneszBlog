import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {map} from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { Group } from '../../shared/models/Group';
import {GroupObject} from '../../shared/constant';
import { ProfileObject } from '../../shared/constant';


@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  GroupNames: string[] = [];
  filteredGroupNames!: Observable<string[]>;

  searchBar = new FormControl('');

  isLoggedIn: boolean = false;
  currentUserGroups: Group[] = [];

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("loggedInUser") != null;

    if (this.isLoggedIn) {
      for(let i = 0; i < ProfileObject.length; i++) {
        if (ProfileObject[i].id == localStorage.getItem("loggedInUser")) {
          ProfileObject[i].groups.forEach(groupId => {
            for(let  x = 0; x < GroupObject.length; x++) {
              if (GroupObject[x].id == groupId) {
                this.currentUserGroups.push({
                  'id': GroupObject[x].id,
                  'name': GroupObject[x].name,
                  'posts': GroupObject[x].posts
                  }
                )
              }
            }
          });
        }
      }
    }

    this.GroupNames = GroupObject.map(group => group.name);

    this.filteredGroupNames = this.searchBar.valueChanges.pipe(
      map(value => this._filterGroupNames(value || ''))
    );
  }

  private _filterGroupNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.GroupNames.filter(name => {
      return name.toLowerCase().includes(filterValue) && filterValue != ""
    }
    );
  }

  redirect(dest: number) {
    window.location.href = "group/" + dest;
  }

  redirectSearchBar() {

    if (this.searchBar.value != null) {
      GroupObject.forEach(group => {
        if (group.name.toLowerCase() == this.searchBar.value?.toLocaleLowerCase()) {
          location.href = "group/" + group.id;
        }
      })
    }
  }
}
