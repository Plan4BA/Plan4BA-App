import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

import { SidenavService } from '../shared/sidenav/sidenav.service';
import { MealsService } from '../shared/meals/meals.service';
import { Meal } from '../shared/meals/meal.model';
import { Food } from '../shared/meals/food.model';

@Component({
  selector: 'p4ba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  today: Date;
  todaysMeals: Food[] = [];

  constructor(
    private sidenavService: SidenavService,
    private routerExtensions: RouterExtensions,
    private mealsService: MealsService,
  ) {
    this.today = new Date();
    this.today.setUTCHours(0, 0, 0, 0);

    this.mealsService.getData().subscribe((meals: Meal[]) => {
      const todaysMealsData = meals.find((meal: Meal) => {
        const mealDay = new Date(meal.day);
        mealDay.setUTCHours(0, 0, 0, 0);
        return mealDay.getTime() === this.today.getTime();
      });
      if (todaysMealsData) {
        this.todaysMeals = todaysMealsData.meals;
      }
    });
  }

  openLectures(): void {
    this.routerExtensions.navigateByUrl('/daily-lectures?date=' + this.today.getTime());
  }

  openMeals(): void {
    this.routerExtensions.navigateByUrl('/meals');
  }

  ngOnInit() {
  }
}
