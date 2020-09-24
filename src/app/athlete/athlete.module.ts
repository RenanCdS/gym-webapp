import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthleteRoutingModule } from './athlete-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AthleteRegisterPageComponent } from './pages/athlete-register-page/athlete-register-page.component';
import { AthleteUpdatePageComponent } from './pages/athlete-update-page/athlete-update-page.component';
import { TrainingPageComponent } from './pages/training-page/training-page.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AthleteRegisterPageComponent, AthleteUpdatePageComponent, TrainingPageComponent],
  imports: [
    CommonModule,
    SwiperModule,
    SharedModule,
    LottieModule.forRoot({ player: playerFactory }),
    AthleteRoutingModule
  ]
})
export class AthleteModule { }
