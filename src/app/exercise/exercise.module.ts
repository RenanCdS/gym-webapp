import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ExerciseRegisterComponent } from './pages/exercise-register/exercise-register.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExerciseRegisterComponent, ExercisesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
