import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-periode-dialog',
  templateUrl: './change-periode-dialog.component.html',
  styleUrls: ['./change-periode-dialog.component.scss'],
})
export class ChangePeriodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangePeriodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
