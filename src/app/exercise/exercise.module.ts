import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise.component';
import { ExerciseRoutingModule } from './exercise-routing.module';



@NgModule({
  declarations: [ExerciseComponent],
  imports: [
    CommonModule,
    ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
