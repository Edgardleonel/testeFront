import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private auth: AngularFireAuth) {}

  register = (data) => this.auth.createUserWithEmailAndPassword(data.email, data.senha);

  login = (data) => this.auth.signInWithEmailAndPassword(data.email, data.senha);

  logout = () =>  this.auth.signOut();

}
