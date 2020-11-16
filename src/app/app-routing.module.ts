import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: BasePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'treinador', loadChildren: () => import('./coach/coach.module').then(m => m.CoachModule) },
      { path: 'metas', loadChildren: () => import('./goal/goal.module').then(m => m.GoalModule) },
      { path: 'atleta', loadChildren: () => import('./athlete/athlete.module').then(m => m.AthleteModule) },
      { path: 'erro', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: '**', redirectTo: '/home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
