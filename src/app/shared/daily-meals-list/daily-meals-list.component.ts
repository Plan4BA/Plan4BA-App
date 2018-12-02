import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Food } from '../meals/food.model';

@Component({
  selector: 'p4ba-daily-meals-list',
  templateUrl: './daily-meals-list.component.html',
  styleUrls: ['./daily-meals-list.component.css']
})
export class DailyMealsListComponent implements OnInit {

  @Output() tapEvent = new EventEmitter<any>();
  @Input() dailyMeals: Food[] = [];

  constructor() { }

  ngOnInit() {
  }

}
