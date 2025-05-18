import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormDatePipe } from '../../shared/pipes/form-date.pipe';
import { Post } from '../../shared/models/Post';
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { PostService } from '../../shared/services/post.service';
import { from } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { CommentService } from '../../shared/services/comment.service';
import { Comment } from '../../shared/models/Comment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post',
  imports: [
    MatCardModule,
    MatDividerModule,
    PostCommentComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    FormDatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private commentService: CommentService) {}

  post: Post | null = null;
  postAuthor: String = "";
  postCategory: String = "";

  commentForm = new FormGroup({
    commentText: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const currentPostId = String(this.route.snapshot.paramMap.get('postId'));
    
    from(this.postService.getPostById(currentPostId)).subscribe(post => {
      if (post) {
        this.post = post

        this.userService.getUserByUid(post.author).then(user => {
          if (user) {
            this.postAuthor = user.name;
          }
        });
      } else {
        this.post = null;
      }
    })
  }


  newComment() {
    this.userService.getLoggedInUser().subscribe(user => {
      if (this.post && user) {
        var comment = this.commentForm.get("commentText")?.value;
        if (comment == null || comment == "") {
          return;
        }
        
        const newComment: Partial<Comment> = {
          writer: user.id,
          text: comment,
        }
        this.commentService.addComment(this.post.id, newComment).then(() => window.location.reload());
      }
    })
  }
}

