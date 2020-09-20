import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachFormComponent } from './coach-form.component';

const routes: Routes = [
  { path: '', component: CoachFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoachFormRoutingModule { }
