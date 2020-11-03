import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) {}

   //Create
   createFavorite = data => this.db.collection('favorites').add(data);
   createUser = data => this.db.collection('user').add(data);

   //Delete
   deleteFavorite(key) {
     return this.db.collection('favorites').doc(key).delete();
   }

   //Get
   getCurrentUser(email) {
     return this.db.collection('user', ref => ref.where('email', '==', email))
     .snapshotChanges();
   }

   getFavorites() {
     return this.db.collection('favorites')
     .snapshotChanges();
   }

   getCurrentFavorites(id) {
    return this.db.collection('favorites', ref => ref.where('id', '==', id))
    .snapshotChanges();
  }

   //Update
   saveFavorites(data, key) {
     return this.db.collection('favorites').doc(key).update(data);
   }

   saveAccount(data, key) {
    return this.db.collection('user').doc(key).update(data);
  }
}
