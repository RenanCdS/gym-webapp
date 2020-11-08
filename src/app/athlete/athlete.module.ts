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
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { athleteReducer } from './state/athlete.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AthleteEffects } from './state/athlete.effects';
import { TrainingTypeComponent } from './pages/training-type/training-type.component';
import { FinalizedTrainingPageComponent } from './pages/finalized-training-page/finalized-training-page.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AthleteRegisterPageComponent, AthleteUpdatePageComponent, TrainingPageComponent, TrainingTypeComponent, FinalizedTrainingPageComponent],
  imports: [
    CommonModule,
    SwiperModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('athlete', athleteReducer),
    EffectsModule.forFeature([AthleteEffects]),
    LottieModule.forRoot({ player: playerFactory }),
    AthleteRoutingModule
  ]
})
export class AthleteModule { }
