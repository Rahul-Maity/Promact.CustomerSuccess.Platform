import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
  onCancel(): void {
    // throw new Error('Method not implemented.');
    this.dialogRef.close(true);
  }
  onConfirm(): void {
    // throw new Error('Method not implemented.');
    this.dialogRef.close(false);
  }

}
