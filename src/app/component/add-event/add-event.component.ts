import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';

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

}
