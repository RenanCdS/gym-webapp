import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: BasePageComponent,
    canActivate: [AuthGuard],
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
