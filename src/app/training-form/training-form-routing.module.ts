import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingFormComponent } from './training-form.component';


const routes: Routes = [
  { path: '', component: TrainingFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingFormRoutingModule { }
