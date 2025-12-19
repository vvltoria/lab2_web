import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirestoreService, Book } from '../services/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  bookId: number | null = null;
  book: Book = { 
    title: '', 
    author: { firstName: '', lastName: '' },
    genre: '',
    publicationYear: 2024,
    isbn: '',
    totalCopies: 1
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.bookId = Number(idParam);
      this.firestoreService.getBook(this.bookId).pipe(take(1)).subscribe(book => {
        this.book = book;
        if (!this.book.author) {
             this.book.author = { firstName: '', lastName: '' };
        }
      });
    }
  }

  saveBook() {
    const bookData: Book = { ...this.book };

    if (this.bookId) {
      this.firestoreService.updateBook(this.bookId, bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error(err)
      });
    } else {
      this.firestoreService.addBook(bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error(err)
      });
    }
  }
}