import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { MealsService } from '../shared/data/meals/meals.service';
import { Meal } from '../shared/data/meals/meal.model';
import { Food } from '../shared/data/meals/food.model';

@Component({
  selector: 'p4ba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  today: Date;
  todaysMeals: Food[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private mealsService: MealsService,
  ) {
    this.today = new Date();
    this.today.setUTCHours(0, 0, 0, 0);

    this.mealsService.getData().subscribe((meals: Meal[]) => {
      if (meals) {
        const todaysMealsData = meals.find((meal: Meal) => {
          const mealDay = new Date(meal.day);
          mealDay.setUTCHours(0, 0, 0, 0);
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

  ngOnInit() {
  }
}
