import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {EventData} from './model/event-data';
import {EventService} from './service/event.service';
import {EventComponent} from './component/event/event.component';
import {HeaderComponent} from './component/header/header.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {AddEventComponent} from './component/add-event/add-event.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventComponent, HeaderComponent, MatGridList, MatGridTile, AddEventComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
    this.events.splice(this.events.indexOf($event), 1);
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
