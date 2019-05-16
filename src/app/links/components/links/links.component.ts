import { Component } from '@angular/core';

import { Link } from '@app/shared/data/links/link.model';
import { LinksService } from '@app/shared/data/links/link.service';

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
