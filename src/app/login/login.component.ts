import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { getToken } from './state';
import { LoginPageActions } from './state/actions';
import { LoginState } from './state/login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  loginForm: FormGroup;
  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/squat.json',
    autoplay: true,
    loop: true,
  };

  constructor(private readonly store: Store<LoginState>,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.subs.push(this.store.select(getToken).subscribe(token => { localStorage.setItem('access_token', token); }));
  }

  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(1);
    animationItem.play();
  }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.store.dispatch(LoginPageActions.login(
      {
        login: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      }
    ));
  }

  ngOnDestroy(): void {
    if (this.subs.length) {
      this.subs.forEach(element => {
        element.unsubscribe();
      });
    }
  }

}
