import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AthleteRoutingModule } from './athlete-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AthleteRegisterPageComponent } from './pages/athlete-register-page/athlete-register-page.component';
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
import { TextMaskModule } from 'angular2-text-mask';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export function playerFactory() {
  return player;
}

const components = [
  AthleteRegisterPageComponent,
  TrainingPageComponent,
  TrainingTypeComponent,
  FinalizedTrainingPageComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SwiperModule,
    SharedModule,
    ReactiveFormsModule,
    TextMaskModule,
    StoreModule.forFeature('athlete', athleteReducer),
    EffectsModule.forFeature([AthleteEffects]),
    LottieModule.forRoot({ player: playerFactory }),
    AthleteRoutingModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe
  ]
})
export class AthleteModule { }
