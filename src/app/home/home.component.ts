import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/sidenav/sidenav.service';

@Component({
  selector: 'p4ba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'plan4ba';

  constructor(
    private sidenavService: SidenavService,
  ) { }

  ngOnInit() {
  }
}
