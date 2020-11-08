import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericErrorPageComponent } from './pages/generic-error-page/generic-error-page.component';

const routes: Routes = [
  {
    path: '',
    component: GenericErrorPageComponent
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
