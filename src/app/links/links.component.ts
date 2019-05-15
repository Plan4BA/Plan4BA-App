import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Link } from '../shared/data/links/link.model';
import { LinksService } from '../shared/data/links/link.service';

@Component({
  selector: 'p4ba-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  links: Link[] = [];

  constructor(private linksService: LinksService) {
    this.linksService.getData().subscribe((links: Link[]) => {
      if (links) {
        this.links = links;
      }
    });
  }
}
