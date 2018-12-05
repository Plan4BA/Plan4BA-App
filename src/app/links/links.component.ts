import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SidenavService } from '../shared/sidenav/sidenav.service';
import { MealsService } from '../shared/meals/meals.service';
import { Meal } from '../shared/meals/meal.model';
import { Food } from '../shared/meals/food.model';
import { UniversityService } from '../shared/university/university.service';
import { University } from '../shared/university/university.model';

@Component({
  selector: 'p4ba-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {

  links: {label: string, url: string}[] = [];

  constructor(
    private universityService: UniversityService
  ) {
    this.universityService.getData().subscribe((university: University) => {
      if (university) {
        this.links = university.links;
      }
    });
  }

  ngOnInit() {
  }
}
