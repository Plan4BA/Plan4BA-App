import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { InfoTextsService } from '../info-texts/info-texts.service';

export interface DialogParameter {
  title: string;
  contentText: string;
  buttonName: string;
  buttonWarn: boolean;
}

@Component({
  selector: 'p4ba-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.scss']
})
export class UserCredentialsComponent implements OnInit {

  title = 'Login Daten eingeben';
  contentText = '';
  buttonName = '';
  buttonWarn = false;
  username = '';
  password = '';

  constructor(
    public dialogRef: MatDialogRef<UserCredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogParameter
    ) {
    if (data) {
      this.title = data.title;
      this.contentText = data.contentText;
      this.buttonName = data.buttonName;
      this.buttonWarn = data.buttonWarn;
    }
  }

  ngOnInit() {
  }

}
