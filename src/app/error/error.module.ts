import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericErrorPageComponent } from './pages/generic-error-page/generic-error-page.component';
import { ErrorRoutingModule } from './error-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GenericErrorPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
