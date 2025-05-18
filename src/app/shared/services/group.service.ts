import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc, addDoc, orderBy, limit, count } from '@angular/fire/firestore';
import { Observable, from, of, map, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Group } from '../models/Group';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getAllGroups(): Observable<Group[]> {
    const groupsCollection = collection(this.firestore, 'Groups');

    return from(getDocs(groupsCollection)).pipe(
      switchMap(querySnapshot => {
        const groups: Group[] = [];
        querySnapshot.forEach(doc => {
          groups.push({ ...doc.data(), id: doc.id } as Group);
        });
        return of(groups);
      })
    );
  }

  getGroupsByCurrentUser(): Observable<Group[]> {
     return this.authService.currentUser.pipe(
      switchMap(async user => {
        if (!user) {
          return [];
        }
        try {
          const userDocRef = doc(this.firestore, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            return [];
          }
          const userData = userDoc.data() as User;
          const groupIds = userData.groups || [];
          if (groupIds.length === 0) {
            return [];
          }

          const groupsCollection = collection(this.firestore, "Groups");
          const groups: Group[] = [];
          const batchSize = 10;

          for (let i = 0; i < groupIds.length; i += batchSize) {
            const batch = groupIds.slice(i, i + batchSize);
            const q = query(groupsCollection, where('__name__', 'in', batch));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              groups.push({ ...doc.data(), id: doc.id } as Group);
            });
          }

          return groups;
        } catch (error) {
          console.error("Hiba történt a követett csoportok gyűjtése során", error);
          return [];
        }
      }
    ));
  }

  getGroupById(groupId: string): Observable<Group | null> {
    const groupDocRef = doc(this.firestore, 'Groups', groupId);
    return from(getDoc(groupDocRef)).pipe(
      switchMap(doc => {
        if (doc.exists()) {
          return of({ ...doc.data(), id: doc.id } as Group);
        } else {
          return of(null);
        }
      })
    );
  }

  followGroup(groupId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.currentUser.subscribe(async user => {
        try {
          if (!user) {
            reject('Nincs bejelentkezett felhasználó');
            return;
          }
          
          const userDocRef = doc(this.firestore, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            reject('Nem sikerült megszerezni a felhasználó adatait');
            return;
          }

          const userData = userDoc.data() as User;
          const groups = userData.groups || [];

          groups.push(groupId);

          await updateDoc(userDocRef, {groups: groups, group_count: userData.group_count + 1});
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  unfollowGroup(groupId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.currentUser.subscribe(async user => {
        try {
          if (!user) {
            reject('Nincs bejelentkezett felhasználó');
            return;
          }
          
          const userDocRef = doc(this.firestore, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            reject('Nem sikerült megszerezni a felhasználó adatait');
            return;
          }

          const userData = userDoc.data() as User;
          const updatedGroups = userData.groups.filter(id => id !== groupId);

          await updateDoc(userDocRef, {groups: updatedGroups, group_count: userData.group_count - 1});
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async addGroup(name: string): Promise<void> {
    try {
      const groupsCollection = collection(this.firestore, "Groups");

      const newGroup: Partial<Group> = {
        name: name,
        posts: [],
        post_count: 0,
      }
      
      const docRef = await addDoc(groupsCollection, newGroup);
      const groupId = docRef.id;
      
      return updateDoc(docRef, { id: groupId });
    } catch (error) {
      console.error('Hiba az új kategória hozzáadása folyamán:', error);
      throw error;
    }
  }

  getTop(): Observable<Group[]> {
    const groupsCollection = collection(this.firestore, "Groups");
    const top5Query = query(
      groupsCollection, 
      orderBy("post_count", "desc"),
      limit(5),
    )

    return from(getDocs(top5Query)).pipe(
      map(querySnapshot =>{
        const groups: Group[] = [];
        querySnapshot.forEach(doc => {
          groups.push({...doc.data(), id: doc.id} as Group);
        });
        return groups;
      })
    );
  }
}
