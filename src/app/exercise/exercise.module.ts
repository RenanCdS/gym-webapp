import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ExerciseRegisterComponent } from './pages/exercise-register/exercise-register.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseEffects } from './state/exercise.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { exerciseReducer } from './state/exercise.reducer';

@NgModule({
  declarations: [ExerciseRegisterComponent, ExercisesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    StoreModule.forFeature('exercise', exerciseReducer),
    EffectsModule.forFeature([ExerciseEffects]),
    ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
