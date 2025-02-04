import {Component, EventEmitter, inject, input, model, output, Output} from '@angular/core';
import {EventService} from '../../service/event.service';
import {EventData} from '../../model/event-data';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {EventDialogComponent} from '../event-dialog/event-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-event',
  imports: [
    MatFormFieldModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatCardHeader
  ],
  templateUrl: './event.component.html',
  standalone: true,
  styleUrl: './event.component.scss'
})
export class EventComponent {
  event = input.required<EventData>();
  eventModel = model<EventData>();
  eventService: EventService = inject(EventService);
  dialog = inject(MatDialog);
  @Output() onDelete = new EventEmitter<EventData>();
  @Output() onEdit = new EventEmitter<EventData>();

  editClicked() {
    this.eventModel.set(this.event())
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: this.eventModel()
    });
    dialogRef.afterClosed().subscribe(
      result =>{
        this.onEdit.emit(this.eventModel());
      });
  }

  deleteClicked() {
    this.eventService.deleteEvent(this.event().id).then(
      eventData => {
        this.onDelete.emit(eventData);
      }).catch(e => {
      console.error(e);
    });
  }
}
