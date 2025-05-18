import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../shared/models/Post';
import { UserService } from '../../shared/services/user.service';
import { PostService } from '../../shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Date2DBdatePipe } from '../../shared/pipes/date2-dbdate.pipe';



@Component({
  selector: 'app-new-post',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService) {}
  
  newPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  save() {
    if (this.newPostForm.invalid) {
      return;
    }

    var currentUser: string = "";
    this.userService.getLoggedInUser().subscribe(user => {
      if (user) {
        currentUser = user.id;
      }

      const newPost: Partial<Post> = {
        title: this.newPostForm.get('title')?.value || '',
        text: this.newPostForm.get('text')?.value || '',
        comments: [],
        date: new Date2DBdatePipe().transform(new Date),
        author: currentUser,
      };
  
      const currentGroup = String(this.route.snapshot.paramMap.get('groupId'))

      this.postService.addPost(newPost, currentGroup)
      .then(() => window.location.href = "group/" + currentGroup);
    })

  }
}
