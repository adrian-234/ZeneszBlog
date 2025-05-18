import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Post } from '../models/Post';
import { Group } from '../models/Group';
import { Date2DBdatePipe } from '../pipes/date2-dbdate.pipe';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: Firestore) { }

  async getPostsByIds(postIds: string[]): Promise<Observable<Post[]>> {
    const postsCollection = collection(this.firestore, 'Posts');
    const batchSize = 10;
    const posts: Post[] = [];

    for (let i = 0; i < postIds.length; i += batchSize) {
      const batch = postIds.slice(i, i + batchSize);
      const q = query(postsCollection, where('__name__', 'in', batch));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        posts.push({ ...doc.data(), id: doc.id } as Post);
      });
    }

    return of(posts);
  }

  async getPostById(postId: string): Promise<Post | null> {
    try {
      const postDocRef = doc(this.firestore, 'Posts', postId);
      const postSnapshot = await getDoc(postDocRef);
      
      if (!postSnapshot.exists()) {
        return null;
      }

      const userData = postSnapshot.data() as Post;
      const post = { ...userData, id: postId };
      
      return post;
    } catch (error) {
    console.error('Hiba a felhasználói adatok betöltése során:', error);
    return null;
    }
  }

  async addPost(newPost: Partial<Post>, cat: string): Promise<Post> {
    try {
      const postsCollection = collection(this.firestore, "Posts");
      
      const docRef = await addDoc(postsCollection, newPost);
      const postId = docRef.id;
      
      await updateDoc(docRef, { id: postId });
      
      const newPost2 = {
        ...newPost,
        id: postId,
        comment_count: 0,
      } as Post;

      const groupDocRef = doc(this.firestore, "Groups", cat);
      const groupDoc = await getDoc(groupDocRef);
      if (groupDoc.exists()) {
        const groupData = groupDoc.data() as Group;
        const posts = groupData.posts || [];
        posts.push(postId);
        await updateDoc(groupDocRef, {posts: posts, post_count: groupData.post_count + 1});
      }

      return newPost2;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async deletePost(postId: string, groupId: string): Promise<void> {
    try {
      const groupDocRef = doc(this.firestore, "Groups", groupId);
      const groupDoc = await getDoc(groupDocRef);
      if (!groupDoc.exists()) {
        throw new Error('Nincs ilyen csoport');
      }
      const groupData = groupDoc.data() as Group;
      if (!groupData.posts || !groupData.posts.includes(postId)) {
        throw new Error('Nincs ilyen azonosítójú poszt a csoportban');
      }

      const postDocRef = doc(this.firestore, "Posts", postId);
      await deleteDoc(postDocRef);

      const updatedPosts = groupData.posts.filter(id => id !== postId);
      return updateDoc(groupDocRef, { posts: updatedPosts, post_count: groupData.post_count - 1 });
    } catch (error) {
      console.error('Hiba a poszt törlése folyamán:', error);
      throw error;
    }
  }

  updatePost(editedPost: Partial<Post>, id: string): Promise<void> {
    try {
      const postDocRef = doc(this.firestore, "Posts", id);
      return updateDoc(postDocRef, editedPost);
    } catch (error) {
      console.error('Hiba a poszt frissétése során:', error);
      throw error;
    }
  }

  weeklyStat(): Observable<Post[]> {
    const today = new Date();
    const weekday = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - ((weekday + 6) % 7))
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const pipe = new Date2DBdatePipe;

    const postsCollection = collection(this.firestore, "Posts");
    const weeklyStatQuery = query(
      postsCollection,
      where('date', '>=', pipe.transform(monday)),
      where('date', '<=', pipe.transform(sunday)),
    );

    return from(getDocs(weeklyStatQuery)).pipe(
      map(querySnapshot => {
        const posts: Post[] = [];
        querySnapshot.forEach(doc => {
          posts.push({...doc.data(), id: doc.id} as Post);
        });
        return posts;
      })
    );
  }

  weeklyTopStat(): Observable<Post[]> {
    const today = new Date();
    const weekday = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - ((weekday + 6) % 7))
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const pipe = new Date2DBdatePipe;

    const postsCollection = collection(this.firestore, "Posts");
    const weeklyTopStatQuery = query(
      postsCollection,
      where('date', '>=', pipe.transform(monday)),
      where('date', '<=', pipe.transform(sunday)),
      orderBy('comment_count', 'desc'),
      limit(3),
    );

    return from(getDocs(weeklyTopStatQuery)).pipe(
      map(querySnapshot => {
        const posts: Post[] = [];
        querySnapshot.forEach(doc => {
          posts.push({...doc.data(), id: doc.id} as Post);
        });
        return posts;
      })
    );
  }
}
