import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    SharedModule,
    SwiperModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule { }
