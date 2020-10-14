import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../core/services/session.service';
import { getLoginError, getToken } from './state';
import { LoginPageActions } from './state/actions';
import { LoginState } from './state/login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly ERROR_MESSAGES = new Map([
    [401, 'E-mail ou senha incorretos'],
    [403, 'E-mail ou senha incorretos'],
    [500, 'Ocorreu um erro no sistema :('],
  ]);
  subs: Subscription[] = [];
  loginForm: FormGroup;
  loginError$: Observable<string>;
  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/squat.json',
    autoplay: true,
    loop: true,
  };

  constructor(private readonly store: Store<LoginState>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.select(getLoginError).subscribe(
      error => {
        this.loginForm.reset();
      }
    );
  }

  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(1);
    animationItem.play();
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
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
