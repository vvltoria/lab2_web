import { Routes } from '@angular/router';
import { BookCenterComponent } from './Books/book-center/book-center.component';
import { BOOKS_ROUTES } from './Books/books.routes';
export const routes: Routes = [
  {
    path: 'books', 
    component: BookCenterComponent, 
    children: BOOKS_ROUTES 
  },
  {
    path: '', 
    redirectTo: '/books', 
    pathMatch: 'full'
  },
  {
    path: '**', 
    redirectTo: '/books' 
  }
];