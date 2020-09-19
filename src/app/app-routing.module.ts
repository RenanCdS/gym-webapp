import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import { LoginComponent } from './core/components/login/login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: BasePageComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
