import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable, Subscription } from 'rxjs';
import { getLoginError } from 'src/app/state';
import { AppPageActions } from 'src/app/state/actions';
import { State } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  loginForm: FormGroup;
  loginError$: Observable<string>;
  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/squat.json',
    autoplay: true,
    loop: true,
  };

  constructor(private readonly store: Store<State>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.select(getLoginError).subscribe(
      () => {
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

    this.store.dispatch(AppPageActions.login(
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
