import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/Comment';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private firestore: Firestore) { }

  async getCommentsByIds(commentIds: string[]): Promise<Observable<Comment[]>> {
    const commentsCollection = collection(this.firestore, 'Comments');
    const batchSize = 10;
    const comments: Comment[] = [];

    for (let i = 0; i < commentIds.length; i += batchSize) {
      const batch = commentIds.slice(i, i + batchSize);
      const q = query(commentsCollection, where('__name__', 'in', batch));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(doc => {
        comments.push({ ...doc.data(), id: doc.id } as Comment);
      });
    }

    return of(comments);
  }

  async addComment(postId: string, comment: Partial<Comment>): Promise<Comment> {
    try {
      const commentsCollection = collection(this.firestore, "Comments");
      
      const docRef = await addDoc(commentsCollection, comment);
      const commentId = docRef.id;
      
      await updateDoc(docRef, { id: commentId });
      
      const newComment = {
        ...comment,
        id: commentId
      } as Comment;

      const postDocRef = doc(this.firestore, "Posts", postId);
      const postDoc = await getDoc(postDocRef);
      if (postDoc.exists()) {
        const postData = postDoc.data() as Post;
        const comments = postData.comments || [];
        comments.push(commentId);
        await updateDoc(postDocRef, {comments: comments, comment_count: postData.comment_count + 1});
      }

      return newComment;
    } catch (error) {
      console.error('Hiba az új komment hozzáadása folyamán:', error);
      throw error;
    }
  }
}
