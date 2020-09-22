import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonificationComponent } from './bonification.component';


const routes: Routes = [
  { path: '', component: BonificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonificationRoutingModule { }
