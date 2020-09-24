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
      { path: 'treinador', loadChildren: () => import('./coach/coach.module').then(m => m.CoachModule) },
      { path: 'metas', loadChildren: () => import('./goal/goal.module').then(m => m.GoalModule) },
      { path: 'atleta', loadChildren: () => import('./athlete/athlete.module').then(m => m.AthleteModule) },
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: '**', redirectTo: '/login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
