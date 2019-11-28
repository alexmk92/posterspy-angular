import {Directive, HostListener} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Directive({
  selector: '[appFacebookSignin]'
})
export class FacebookSigninDirective {
  constructor(private afAuth: AngularFireAuth) {}

  @HostListener('click')
  onclick() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        // .catch(error => {
        //   if (error.email) {
        //     var email = error.email;
        //     var user = this.db.list('user', ref => ref.equalTo(email, 'email'))
        //     console.log(user);
        //   }
        //   this.afAuth.auth.getRedirectResult().then(result => {
        //     let credential = result.credential;
        //     let user = result.user;
        //
        //     if (credential) {
        //       let prevUser = this.afAuth.auth.currentUser;
        //       this.afAuth.auth.signInWithCredential(credential).then(user => {
        //         let currentUser = user;
        //         return user.delete().then(() => {
        //           return prevUser.linkWithCredential(credential);
        //         }).then(() => {
        //           return this.afAuth.auth.signInWithCredential(credential);
        //         })
        //       }).catch(error => {
        //         console.log("Sign in error", error);
        //       })
        //     }
        //   });
        // });
  }
}
