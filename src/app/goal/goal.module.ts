import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalRoutingModule } from './goal-routing.module';
import { GoalComponent } from './goal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [GoalComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoalRoutingModule
  ]
})
export class GoalModule { }
