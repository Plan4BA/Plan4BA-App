import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogParameter {
  title: string;
  contentText: string;
  buttonName: string;
  buttonWarn: boolean;
}

@Component({
  selector: 'p4ba-user-credentials',
  templateUrl: './user-credentials-dialog.component.html',
  styleUrls: ['./user-credentials-dialog.component.scss']
})
export class UserCredentialsDialogComponent implements OnInit {
  title = '';
  contentText = '';
  buttonName = '';
  buttonWarn = false;
  username = '';
  password = '';

  constructor(
    public dialogRef: MatDialogRef<UserCredentialsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogParameter
  ) {
    if (data) {
      this.title = data.title;
      this.contentText = data.contentText;
      this.buttonName = data.buttonName;
      this.buttonWarn = data.buttonWarn;
    }
  }

  ngOnInit() {}

  submit() {
    this.dialogRef.close({ username: this.username, password: this.password });
  }
}
