import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {EventData} from '../../model/event-data';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-event-dialog',
  imports: [
    MatFormFieldModule,
    MatDialogTitle,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './event-dialog.component.html',
  standalone: true,
  styleUrl: './event-dialog.component.scss'
})
export class EventDialogComponent {
  readonly dialogRef: MatDialogRef<EventDialogComponent> = inject(MatDialogRef<EventDialogComponent>)
  readonly data: EventData = inject<EventData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
