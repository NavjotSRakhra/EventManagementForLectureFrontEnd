import {
  Component,
  EventEmitter,
  inject,
  input,
  InputSignal,
  model,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import {EventService} from '../../service/event.service';
import {EventData} from '../../model/event-data';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {EventDialogComponent} from '../event-dialog/event-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-event',
  imports: [
    MatFormFieldModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatCardHeader,
    RouterLink
  ],
  templateUrl: './event.component.html',
  standalone: true,
  styleUrl: './event.component.scss'
})
export class EventComponent {
  private readonly route = inject(ActivatedRoute);
  event: InputSignal<EventData> = input.required<EventData>();
  eventFetched: WritableSignal<EventData>;
  eventModel = model<EventData>();
  isClickable: boolean = true;
  eventService: EventService = inject(EventService);
  dialog = inject(MatDialog);
  @Output() onDelete = new EventEmitter<EventData>();
  @Output() onEdit = new EventEmitter<EventData>();

  constructor() {

    let dummyEvent: EventData = {
      id: -2,
      title: "",
      description: "",
    }
    this.eventFetched = signal(dummyEvent)

    let eventId: number;
    eventId = this.route.snapshot.params['id'];
    console.log('eventId', eventId);
    if (eventId != undefined) {
      this.isClickable = false;
      this.eventService.getEventById(eventId)
        .then((event: EventData) => {
          this.eventFetched = signal(event);
        })
    }
  }

  editClicked() {
    if (this.isClickable)
      this.eventModel.set(this.event())
    else
      this.eventModel.set(this.eventFetched())
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: this.eventModel()
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.eventService.updateEvent(result)
          .then(
            event => {
              this.onEdit.emit(event);
            }
          )
      });
  }

  deleteClicked() {
    if (this.isClickable)
      this.eventService.deleteEvent(this.event().id).then(
        eventData => {
          this.onDelete.emit(eventData);
        }).catch(e => {
        console.error(e);
      });
    else
      this.eventService.deleteEvent(this.eventFetched().id).then(
        eventData => {
          this.onDelete.emit(eventData);
        }).catch(e => {
        console.error(e);
      });
  }
}
