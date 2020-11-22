import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseRegisterComponent } from './pages/exercise-register/exercise-register.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';

const routes: Routes = [
  { path: '', component: ExercisesComponent },
  { path: 'cadastrar', component: ExerciseRegisterComponent },
  { path: 'editar', component: ExerciseRegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExerciseRoutingModule { }
