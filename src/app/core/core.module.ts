import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { RouterModule } from '@angular/router';


export function playerFactory() {
  return player;
}

const components = [
  LoginComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory }),
    SharedModule
  ]
})
export class CoreModule { }
