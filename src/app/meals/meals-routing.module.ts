import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsComponent } from './components/meals/meals.component';

const routes: Routes = [{ path: '', component: MealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule {}
