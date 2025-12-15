import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditComponent } from './book-edit/book-edit.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'add',
    component: BookEditComponent
  },
  {
    path: 'edit/:id',
    component: BookEditComponent
  },
  {
    path: ':id',
    component: BookDetailsComponent
  }
];