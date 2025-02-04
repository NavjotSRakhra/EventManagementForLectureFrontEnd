import {Injectable} from '@angular/core';
import {EventData} from '../model/event-data';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventUrl: string = 'api/event';
  constructor() {
  }

  async getAllEvents(): Promise<EventData[]> {
    const data = await fetch(this.eventUrl);
    return await data.json() as EventData[];
  }

  async getEventById(id: number): Promise<EventData> {
    const data = await fetch(`${this.eventUrl}/${id}`);
    return await data.json() as EventData;
  }

  async createEvent(data: EventData): Promise<EventData> {
    const response = await fetch(this.eventUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json() as EventData;
  }

  async updateEvent(data: EventData): Promise<EventData> {
    const response = await fetch(`${this.eventUrl}/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json() as EventData;
  }

  async deleteEvent(id: number): Promise<EventData> {
    const response = await fetch(`${this.eventUrl}/${id}`, {
      method: 'DELETE'
    });
    return await response.json() as EventData;
  }
}
