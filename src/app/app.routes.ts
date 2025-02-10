import {Routes} from '@angular/router';
import {EventComponent} from './component/event/event.component';
import {HomeComponent} from './component/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, loadComponent: () => HomeComponent},
  {path: 'event/:id', component: EventComponent, loadComponent: () => EventComponent},
];
