import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn:  'root'
})
export  class  AuthService {

    user: User;
    constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    }

    doLogin(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            console.log('Sign-in success: ' + value.email);
            resolve(res);
          }, err => {
            reject(err);
          })
        })
      }

    doLogout(){
        return new Promise((resolve, reject) => {
          if(firebase.auth().currentUser){
            this.afAuth.auth.signOut();
            resolve();
          }
          else{
            reject();
          }
        });
      }
}