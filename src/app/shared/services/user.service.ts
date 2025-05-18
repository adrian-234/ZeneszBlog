import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getLoggedInUser(): Observable<User | null> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of(null);
        }

        return from(this.getUserByUid(authUser.uid));
      })
    );
  }

  async getUserByUid(userId: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return null;
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
      
      return user;
    } catch (error) {
    console.error('Hiba a felhasználói adatok betöltése során:', error);
    return null;
    }
  }

  getCurrentUserRole(): Observable<string | null> {
    return this.getLoggedInUser().pipe(
      switchMap(userProfile => {
        if (userProfile) {
          return of(userProfile.role);
        } else {
          return of(null);
        }
      })
    );
  }

  async noFollowCount(): Promise<number> {
    const usersCollection = collection(this.firestore, "Users");
    const noFollowCountQuery = query(
      usersCollection,
      where('role', '==', 'reader'),
      where('group_count', '==', 0),
    );
    
    const snapshot = await getDocs(noFollowCountQuery);
    return snapshot.size;
  }
}
