import {Component, inject} from '@angular/core';
import {EventData} from '../../model/event-data';
import {EventService} from '../../service/event.service';
import {EventComponent} from '../event/event.component';
import {AddEventComponent} from '../add-event/add-event.component';

@Component({
  selector: 'app-home',
  imports: [
    EventComponent,
    AddEventComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Event Management';
  events: EventData[] = [];
  eventService = inject(EventService);

  constructor() {
    this.eventService.getAllEvents()
      .then((events) => {
        this.events = events;
      })
  }

  deleteEvent($event: EventData) {
    const index = this.events.findIndex(event => event.id === $event.id);
    this.events.splice(index, 1);
  }

  editEvent($event: EventData) {
    this.eventService.updateEvent($event).then(updatedEvent => {
      const index = this.events.findIndex(event => event.id === updatedEvent.id);
      this.events[index] = updatedEvent;
    });
  }

  addEvent($event: EventData) {
    this.eventService.createEvent($event).then(
      eventData => {
        this.events.push(eventData);
      }
    )
  }
}
