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
      { path: 'cadastro-treinador', loadChildren: () => import('./coach-form/coach-form.module').then(m => m.CoachFormModule) },
      { path: 'cadastro-atleta', loadChildren: () => import('./athlete-form/athlete-form.module').then(m => m.AthleteFormModule) },
      { path: 'treino', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule) },
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
