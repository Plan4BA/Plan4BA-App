import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SidenavService } from '../shared/sidenav/sidenav.service';
import { DailyLecturesComponent } from '../shared/daily-lectures/daily-lectures.component';
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
    const dialogRef = this.dialog.open(DailyLecturesComponent, {data: {date: this.today}});
  }

  openMeals(): void {
    this.router.navigateByUrl('/meals');
  }

  ngOnInit() {
  }
}
