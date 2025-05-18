import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../shared/models/Post';
import { PostService } from '../../shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-new-post',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit{
  constructor(private route: ActivatedRoute, private postService: PostService) {}
  
  newPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  currentPostId: string = "";
  post: Post | null = null;

  ngOnInit(): void {
    this.currentPostId = String(this.route.snapshot.paramMap.get('postId'));

    this.loadData();
  }

  private loadData() {
    this.postService.getPostById(this.currentPostId).then(post => {
      this.post = post;
    })
  }
  
  save() {
    if (this.newPostForm.invalid) {
      return;
    }

    const newPost: Partial<Post> = {
      title: this.newPostForm.get('title')?.value || '',
      text: this.newPostForm.get('text')?.value || '',
    };

    this.postService.updatePost(newPost, this.currentPostId)
    .then(() => window.location.href = "home");

  }
}
