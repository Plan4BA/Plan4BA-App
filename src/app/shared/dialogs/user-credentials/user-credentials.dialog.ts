import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { InfoTextsService } from '../../data/info-texts/info-texts.service';

export interface DialogParameter {
  title: string;
  contentText: string;
  buttonName: string;
  buttonWarn: boolean;
}

@Component({
  selector: 'p4ba-user-credentials',
  templateUrl: './user-credentials.dialog.html',
  styleUrls: ['./user-credentials.dialog.scss']
})
export class UserCredentialsDialog implements OnInit {

  title = '';
  contentText = '';
  buttonName = '';
  buttonWarn = false;
  username = '';
  password = '';

  constructor(
    public dialogRef: MatDialogRef<UserCredentialsDialog>,
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
