import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink,
    MatButton,
    MatCard
  ],
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
