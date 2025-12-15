import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService, BookWithId } from '../services/firestore.service';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books$!: Observable<BookWithId[]>;
  constructor(private firestoreService: FirestoreService) {}
  ngOnInit(): void {
    this.books$ = this.firestoreService.getBooks();
  }
}