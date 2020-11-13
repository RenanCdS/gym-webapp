import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

const components = [
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
