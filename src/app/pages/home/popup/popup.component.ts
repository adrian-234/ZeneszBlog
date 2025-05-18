import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions,  MatDialogClose,  MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';

export interface DialogData {
  groupName: string;
}

@Component({
  selector: 'app-popup',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  readonly dialogRef = inject(MatDialogRef<PopupComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly groupName = "";

  closePopUp(): void {
    this.dialogRef.close();
  }
}