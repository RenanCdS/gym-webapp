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


@NgModule({
  declarations: [CoachRegisterPageComponent, CoachListPageComponent, MyAthletesPageComponent, TrainingRegisterPageComponent, CoachUpdatePageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CoachRoutingModule
  ]
})
export class CoachModule { }
