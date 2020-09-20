import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachFormComponent } from './coach-form.component';
import { CoachFormRoutingModule } from './coach-form-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CoachFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoachFormRoutingModule
  ]
})
export class CoachFormModule { }
