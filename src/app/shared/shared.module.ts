import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

const components = [];

const modules = [
  CommonModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatBadgeModule,
  MatTooltipModule,
  MatStepperModule,
  MatSelectModule
];

@NgModule({
  declarations: [...components],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components
  ]
})
export class SharedModule { }
