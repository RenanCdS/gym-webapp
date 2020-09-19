import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

const components = [];

const modules = [
  CommonModule,
  MatToolbarModule
];

@NgModule({
  declarations: [ ...components ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components
  ]
})
export class SharedModule { }
