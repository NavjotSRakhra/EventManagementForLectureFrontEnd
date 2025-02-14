import {inject, Injectable} from '@angular/core';
import {EventData} from '../model/event-data';
import {HttpStatusCode} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventUrl: string = 'api/event';
  private router: Router = inject(Router);

  constructor() {
  }

  async getAllEvents(): Promise<EventData[]> {
    const response = await fetch(this.eventUrl);

    await this.handleRedirects(response);

    return await response.json() as EventData[];
  }

  async getEventById(id: number): Promise<EventData> {
    const response = await fetch(`${this.eventUrl}/${id}`);

    await this.handleRedirects(response);

    return await response.json() as EventData;
  }

  async createEvent(data: EventData): Promise<EventData> {
    const response = await fetch(this.eventUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await this.handleRedirects(response);

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

    await this.handleRedirects(response);

    return await response.json() as EventData;
  }

  async deleteEvent(id: number): Promise<EventData> {
    const response = await fetch(`${this.eventUrl}/${id}`, {
      method: 'DELETE'
    });

    await this.handleRedirects(response);

    return await response.json() as EventData;
  }

  async handleRedirects(data: Response) {
    if (data.redirected) {
      window.location.href = data.url
    }
  }
}
