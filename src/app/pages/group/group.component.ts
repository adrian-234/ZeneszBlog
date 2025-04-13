import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { FormDatePipe } from '../../shared/pipes/form-date.pipe';

import { Group } from '../../shared/models/Group';
import { Post } from '../../shared/models/Post';
import { GroupObject, PostObject, ProfileObject } from '../../shared/constant';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormDatePipe,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}

  currentGroup!: Group;
  posts: Post[] = [];
  currentUser!: User;
  isLoggedIn = false;

  ngOnInit(): void {
    const currentGroupId = Number(this.route.snapshot.paramMap.get('groupId'));

    let temp = GroupObject.find(group => group.id == currentGroupId);
    if (temp != undefined) {
      this.currentGroup = {
        'id': temp.id,
        'name': temp.name,
        'posts': temp.posts
      }

      for(let i = this.currentGroup.posts.length - 1; i > -1; i--) {
        PostObject.forEach(post => {
            if (post.id == this.currentGroup.posts[i]) {
              this.posts.push(
                {
                  'id': post.id,
                  'title': post.title,
                  'text': post.text,
                  'author': post.author,
                  'comments': post.comments,
                  'date': post.date,
                }
              )
            }
          })
      }
    } else {
      location.href = "/page-not-found";
    }

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

  follow() {
    console.log("Kategória bekövetve (groupId: " + this.currentGroup.id + ")");
    location.reload();
  }

  unfollow() {
    console.log("Kategória kikövetve (groupId: " + this.currentGroup.id + ")");
    location.reload();
  }

  newPost() {
    console.log("új poszt írás kezdete");
  }

  redirect(dest: number) {
    window.location.href = "post/" + dest;
  }
}
