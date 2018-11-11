import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/sidenav/sidenav.service';

@Component({
  selector: 'p4ba-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService,
  ) { }

  ngOnInit() {
  }

}
