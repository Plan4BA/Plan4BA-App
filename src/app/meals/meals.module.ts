import { NgModule } from '@angular/core';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './components/meals/meals.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [MealsComponent],
  imports: [SharedModule, MealsRoutingModule]
})
export class MealsModule {}
