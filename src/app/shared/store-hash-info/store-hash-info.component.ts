import { Component, OnInit } from '@angular/core';
import { InfoTextsService } from '../info-texts/info-texts.service';

@Component({
  selector: 'p4ba-store-hash-info',
  templateUrl: './store-hash-info.component.html',
  styleUrls: ['./store-hash-info.component.css']
})
export class StoreHashInfoComponent implements OnInit {

  contentText = '';

  constructor(
    private infoTextsService: InfoTextsService
  ) {
    this.infoTextsService.getStructuredData().subscribe((infoTexts: any) => {
        if (infoTexts && infoTexts['login.storehash']) {
          this.contentText = infoTexts['login.storehash'];
        }
      }
    );
  }

  ngOnInit() {
  }

}
