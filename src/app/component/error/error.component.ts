import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-error',
  imports: [
    MatCard,
    RouterLink,
    MatButton
  ],
  templateUrl: './error.component.html',
  standalone: true,
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  errorUuid: string | null = ""
  errorMessage: string | null = ""

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.errorUuid = params.get('errorUuid') == null ? "" : params.get('errorUuid');
      this.errorMessage = params.get('errorMessage') == null ? "" : params.get('errorMessage');
    })
  }
}
