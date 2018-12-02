import { Component, OnInit } from '@angular/core';

import { MealsService } from '../shared/meals/meals.service';

@Component({
  selector: 'p4ba-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(
    private mealsService: MealsService,
  ) { }

  ngOnInit() {
  }

}
