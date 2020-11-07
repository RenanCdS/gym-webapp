import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingGuard } from './guards/training.guard';
import { AthleteRegisterPageComponent } from './pages/athlete-register-page/athlete-register-page.component';
import { AthleteUpdatePageComponent } from './pages/athlete-update-page/athlete-update-page.component';
import { TrainingPageComponent } from './pages/training-page/training-page.component';
import { TrainingTypeComponent } from './pages/training-type/training-type.component';


const routes: Routes = [
  { path: '', component: TrainingTypeComponent },
  { path: 'cadastrar', component: AthleteRegisterPageComponent },
  { path: 'atualizar', component: AthleteUpdatePageComponent },
  {
    path: 'treino',
    component: TrainingPageComponent,
    canActivate: [TrainingGuard]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthleteRoutingModule { }
