import { Component, OnInit } from '@angular/core';

import { MealsService } from '../shared/meals/meals.service';
import { SidenavService } from '../shared/sidenav/sidenav.service';

@Component({
  selector: 'p4ba-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService,
    private mealsService: MealsService,
  ) { }

  ngOnInit() {
  }

}
