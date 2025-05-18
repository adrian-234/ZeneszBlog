import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormDatePipe } from '../../shared/pipes/form-date.pipe';

import { Group } from '../../shared/models/Group';
import { Post } from '../../shared/models/Post';
import { User } from '../../shared/models/User';
import { GroupService } from '../../shared/services/group.service';
import { PostService } from '../../shared/services/post.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormDatePipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit{
  constructor(private route: ActivatedRoute, private groupService: GroupService, private postServive: PostService, private userService: UserService) {}

  currentGroup!: Group;
  posts: Post[] = [];
  currentUser: User | null = null;
  isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
  loaded = false;
  currentGroupId: string = "";

  ngOnInit(): void {
    this.currentGroupId = String(this.route.snapshot.paramMap.get('groupId'));

    this.loadData();
  }
    
  private async loadData() {
    this.userService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });

    this.groupService.getGroupById(this.currentGroupId).subscribe(async group => {
      if (group) {
        this.currentGroup = group;
      } else {
        location.href = "/page-not-found";
      }
  
      (await this.postServive.getPostsByIds(this.currentGroup.posts)).subscribe(posts => {
        this.posts = posts;

        this.loaded = true;
      });
    });
  }

  follow() {
    this.groupService.followGroup(this.currentGroup.id).then(() => window.location.reload());
  }

  unfollow() {
    this.groupService.unfollowGroup(this.currentGroup.id).then(() => window.location.reload());
  }

  newPost() {
    window.location.href = "new-post/" + this.currentGroup.id;
  }

  redirect(dest: string) {
    window.location.href = "post/" + dest;
  }

  edit(id: string) {
    window.location.href = "edit-post/" + id;
  }

  delete(id: string) {
    this.postServive.deletePost(id, this.currentGroupId).then(() => window.location.reload())
  }
}