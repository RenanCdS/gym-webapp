import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachRoutingModule } from './coach-routing.module';
import { CoachRegisterPageComponent } from './pages/coach-register-page/coach-register-page.component';
import { CoachListPageComponent } from './pages/coach-list-page/coach-list-page.component';
import { SharedModule } from '../shared/shared.module';
import { MyAthletesPageComponent } from './pages/my-athletes-page/my-athletes-page.component';
import { TrainingRegisterPageComponent } from './pages/training-register-page/training-register-page.component';
import { CoachUpdatePageComponent } from './pages/coach-update-page/coach-update-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { coachReducer } from './state/coach.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoachEffects } from './state/coach.effects';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';

const components = [
  CoachRegisterPageComponent,
  CoachListPageComponent,
  MyAthletesPageComponent,
  TrainingRegisterPageComponent,
  CoachUpdatePageComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TextMaskModule,
    RouterModule,
    StoreModule.forFeature('coach', coachReducer),
    EffectsModule.forFeature([CoachEffects]),
    CoachRoutingModule
  ]
})
export class CoachModule { }
