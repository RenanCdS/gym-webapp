import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { BasePageComponent } from '../base-page/base-page.component';

const components = [
  LoginComponent,
  BasePageComponent
];

@NgModule({
  declarations: [ ...components ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
