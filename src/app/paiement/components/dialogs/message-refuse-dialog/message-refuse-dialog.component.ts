import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-refuse-dialog',
  templateUrl: './message-refuse-dialog.component.html',
  styleUrls: ['./message-refuse-dialog.component.scss'],
})
export class MessageRefuseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageRefuseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
