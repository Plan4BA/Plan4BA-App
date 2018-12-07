import { Component, OnInit } from '@angular/core';

import { MealsService } from '../shared/meals/meals.service';
import { Meal } from '../shared/meals/meal.model';

@Component({
  selector: 'p4ba-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  mealsData: Meal[] = [];

  constructor(
    private mealsService: MealsService,
  ) {
    this.mealsService.getData().subscribe((mealsData: Meal[]) => {
      if (mealsData) {
        this.mealsData = mealsData;
      }
    });
  }

  ngOnInit() {
  }

}
