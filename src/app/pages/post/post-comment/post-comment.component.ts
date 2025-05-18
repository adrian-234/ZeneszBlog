import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';


import { Comment } from '../../../shared/models/Comment';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-post-comment',
  imports: [
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss'
})
export class PostCommentComponent implements OnInit{
  constructor(private commentService: CommentService, private userService: UserService) {}

  @Input() postCommentIds: string[] = [];

  comments: Comment[] = [];
  writer: String = "";

  ngOnInit() {
    this.loadData();
  }

  private async loadData() {
    (await this.commentService.getCommentsByIds(this.postCommentIds)).subscribe(comments => {
      comments.forEach(comment => {
        this.userService.getUserByUid(comment.writer).then(user => {
          if (user) {
            comment.writer = user.name;

            this.comments.push(comment);
          }
        });
      })
    });
  }
}
