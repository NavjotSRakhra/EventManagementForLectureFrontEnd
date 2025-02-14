import {Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event/:id', loadComponent: () => import('./component/event/event.component').then(m => m.EventComponent)},
  {path: 'errors', loadComponent: () => import('./component/error/error.component').then(m => m.ErrorComponent)},
  {path: '**', loadComponent: () => import('./component/not-found/not-found.component').then(m => m.NotFoundComponent)},
];
