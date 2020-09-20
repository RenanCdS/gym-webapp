import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthleteFormComponent } from './athlete-form.component';
import { AthleteFormRoutingModule } from './athlete-form-routing.module';



@NgModule({
  declarations: [AthleteFormComponent],
  imports: [
    CommonModule,
    AthleteFormRoutingModule
  ]
})
export class AthleteFormModule { }
