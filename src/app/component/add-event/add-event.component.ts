import {Component, EventEmitter, inject, model, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {EventData} from '../../model/event-data';
import {MatDialog} from '@angular/material/dialog';
import {EventDialogComponent} from '../event-dialog/event-dialog.component';
import {EventComponent} from '../event/event.component';

@Component({
  selector: 'app-add-event',
  imports: [
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './add-event.component.html',
  standalone: true,
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  readonly event = model<EventData>();
  @Output() onAdd: EventEmitter<EventData> = new EventEmitter();
  dialog = inject(MatDialog);

  addEvent() {
    const myEvent: EventData = {
      id: -1,
      title: "",
      description: "",
    }
    this.event.set(myEvent)
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: this.event()
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (this.event()?.title !== "")
          this.onAdd.emit(this.event());
      });
  }
}
