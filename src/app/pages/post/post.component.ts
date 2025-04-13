import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormDatePipe } from '../../shared/pipes/form-date.pipe';


import { Post } from '../../shared/models/Post';
import { GroupObject, PostObject, ProfileObject } from '../../shared/constant';
import { PostCommentComponent } from "./post-comment/post-comment.component";

@Component({
  selector: 'app-post',
  imports: [
    MatCardModule,
    MatDividerModule,
    PostCommentComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    FormDatePipe
],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}

  post!: Post;
  postAuthor!: String;
  postCategory!: String;

  ngOnInit(): void {
    const currentPostId = Number(this.route.snapshot.paramMap.get('postId'));
      
    PostObject.forEach(post => {
      if (post.id == currentPostId) {
        this.post = {
          "id": post.id,
          "title": post.title,
          "text": post.text,
          "author": post.author,
          "comments": post.comments,
          "date": post.date,
        }

        ProfileObject.forEach(profile => {
          if (profile.id == post.author) {
            this.postAuthor = profile.name;
          }
        })

        GroupObject.forEach(group => {
          if (group.posts.includes(currentPostId)) {
            this.postCategory = group.name;
          };
        })
      }
    })
  }


  newComment() {
    console.log("Új komment");
  }
}

