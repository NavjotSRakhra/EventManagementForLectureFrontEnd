import {Component, inject, input, Output} from '@angular/core';
import {EventService} from '../../service/event.service';
import EventEmitter from 'node:events';
import {EventData} from '../../model/event-data';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-event',
  imports: [
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
  // eventService: EventService = inject(EventService);
  // @Output() deletedEvent: EventEmitter<EventData> = new EventEmitter();
  // @Output() editEvent: EventEmitter<EventData> = new EventEmitter();
  //
  editClicked() {

  }

  deleteClicked() {
    // this.eventService.deleteEvent(this.event().id).then(
    //   eventData => {
    //     this.deletedEvent.emit(eventData);
    //   }).catch(e => {
    //   console.error(e);
    // });
  }
}
