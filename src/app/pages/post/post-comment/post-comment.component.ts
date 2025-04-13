import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';



import { CommentObject, ProfileObject } from '../../../shared/constant';
import { Comment } from '../../../shared/models/Comment';

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
  @Input() postCommentIds!: number[];

  comments: Comment[] = []; 

  ngOnInit(): void {
      this.postCommentIds.forEach(id => {
        CommentObject.forEach(comment => {
          if (comment.id == id) {
            this.comments.push(
              {
                'id': id,
                'text': comment.text,
                'author': comment.author
              }
            )
          }
        })
      })
  }

  getUserById(id: number) {
    for(let i = 0; i < ProfileObject.length; i++) {
      if (ProfileObject[i].id == id) {
        return ProfileObject[i].name
      }
    }
    return "Nem létezik ilyen felhasználó már :("
  }
}
