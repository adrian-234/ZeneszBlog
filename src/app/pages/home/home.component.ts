import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {map} from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Group } from '../../shared/models/Group';
import { GroupService } from '../../shared/services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { MatButton } from '@angular/material/button';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatDividerModule,
    MatButton,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private groupService: GroupService, private userService: UserService) {}

  currentUserGroups: Group[] = [];
  GroupNames: string[] = [];
  filteredGroupNames!: Observable<string[]>;
  topGroups: Group[] = [];

  searchBar = new FormControl('');

  isLoggedIn: boolean = false;
  role: string = "reader";

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
    this.groupService.getGroupsByCurrentUser().subscribe(groups => this.currentUserGroups.push(...groups));

    this.userService.getCurrentUserRole().subscribe(role => {
      if (role) {
        this.role = role;
      }
    })


    this.groupService.getAllGroups().subscribe(group => {
      const tmpGroup = group.map(g => g.name);
      this.GroupNames.push(...tmpGroup);
    });

    this.filteredGroupNames = this.searchBar.valueChanges.pipe(
      map(value => this._filterGroupNames(value || ''))
    );

    this.groupService.getTop().subscribe(data => this.topGroups = data);
  }

  private _filterGroupNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.GroupNames.filter(name => {
      return name.toLowerCase().includes(filterValue) && filterValue != ""
    }
    );
  }

  redirect(dest: string) {
    window.location.href = "group/" + dest;
  }

  redirectSearchBar() {
    if (this.searchBar.value != null) {
      this.groupService.getAllGroups().subscribe(groups => groups.forEach(group => {
        if (group.name.toLowerCase() == this.searchBar.value?.toLocaleLowerCase()) {
          location.href = "group/" + group.id;
        }
      }));
    }
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {groupName: ""},
    });

    dialogRef.afterClosed().subscribe(groupName => {
      if (groupName) {
        this.groupService.addGroup(groupName).then(() => window.location.reload());
      }
    });
  }
}
