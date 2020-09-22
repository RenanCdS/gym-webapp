import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonificationRoutingModule } from './bonification-routing.module';
import { BonificationComponent } from './bonification.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BonificationComponent],
  imports: [
    CommonModule,
    SharedModule,
    BonificationRoutingModule
  ]
})
export class BonificationModule { }
