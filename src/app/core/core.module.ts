import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

const components = [
  LoginComponent
];

@NgModule({
  declarations: [ ...components ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
