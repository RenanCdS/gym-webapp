import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoachListPageComponent } from './pages/coach-list-page/coach-list-page.component';
import { CoachRegisterPageComponent } from './pages/coach-register-page/coach-register-page.component';
import { CoachUpdatePageComponent } from './pages/coach-update-page/coach-update-page.component';
import { MyAthletesPageComponent } from './pages/my-athletes-page/my-athletes-page.component';
import { TrainingRegisterPageComponent } from './pages/training-register-page/training-register-page.component';


const routes: Routes = [
  { path: '', component: CoachRegisterPageComponent },
  { path: 'lista', component: CoachListPageComponent },
  { path: 'meus-atletas', component: MyAthletesPageComponent },
  { path: 'cadastro-treino', component: TrainingRegisterPageComponent },
  { path: 'cadastro-treinador', component: CoachRegisterPageComponent },
  { path: 'atualizar', component: CoachRegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule { }
