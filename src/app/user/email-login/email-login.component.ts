import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})

export class EmailLoginComponent implements OnInit {
  authForm: FormGroup;
  type: 'login' | 'sign_up' | 'reset' = 'sign_up';
  loading = false;

  serverResponse: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'sign_up';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  get passwordConfirm() {
    return this.authForm.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'sign_up') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.auth.sendPasswordResetEmail(email);
        this.serverResponse = 'You should receive an email detailing how to recover your account shortly.';
      }
    } catch (err) {
      this.serverResponse = err;
    }

    this.loading = false;
  }
}
