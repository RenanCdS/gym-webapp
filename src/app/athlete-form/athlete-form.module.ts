import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthleteFormComponent } from './athlete-form.component';
import { AthleteFormRoutingModule } from './athlete-form-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AthleteFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    AthleteFormRoutingModule
  ]
})
export class AthleteFormModule { }
