import { Route } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

export const appRoutes: Route[] = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
