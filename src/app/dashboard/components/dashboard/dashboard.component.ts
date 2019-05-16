import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Food } from '@app/core/models/food.model';
import { MealsService } from '@app/core/services/meals.service';
import { Meal } from '@app/core/models/meal.model';

@Component({
  selector: 'p4ba-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  today: Date;
  todaysMeals: Food[] = [];

  constructor(private router: Router, private mealsService: MealsService) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    this.mealsService.getData().subscribe((meals: Meal[]) => {
      if (meals) {
        const todaysMealsData = meals.find((meal: Meal) => {
          const mealDay = new Date(meal.day);
          mealDay.setHours(0, 0, 0, 0);
          return mealDay.getTime() === this.today.getTime();
        });
        if (todaysMealsData) {
          this.todaysMeals = todaysMealsData.meals;
        }
      }
    });
  }

  openLectures(): void {
    this.router.navigateByUrl('/calendar');
  }

  openMeals(): void {
    this.router.navigateByUrl('/meals');
  }

  ngOnInit() {}
}
