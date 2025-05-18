import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { UserService } from '../../shared/services/user.service';
import { Post } from '../../shared/models/Post';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-stat',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatDivider,
  ],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent implements OnInit{
  constructor(private userService: UserService, private postService: PostService) {}

  nofollowCount: number = -1;

  newPosts: Post[] = [];
  topPosts: Post[] = [];

  ngOnInit(): void {
      this.userService.noFollowCount().then(count => this.nofollowCount = count);

      this.postService.weeklyStat().subscribe(posts => this.newPosts = posts);

      this.postService.weeklyTopStat().subscribe(posts => this.topPosts = posts);
  }
}
