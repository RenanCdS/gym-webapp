import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './state/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './state/login.effects';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LoginEffects]),
    LoginRoutingModule
  ]
})
export class LoginModule { }
