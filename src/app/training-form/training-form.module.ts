import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingFormRoutingModule } from './training-form-routing.module';
import { TrainingFormComponent } from './training-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TrainingFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    TrainingFormRoutingModule
  ]
})
export class TrainingFormModule { }
