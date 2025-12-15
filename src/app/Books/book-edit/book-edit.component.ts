import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService, BookWithId, BookInput } from '../services/firestore.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  book: BookWithId | BookInput | undefined;
  isEditMode = false;
  private bookId: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.isEditMode = true;
      this.firestoreService.getBook(this.bookId).pipe(take(1)).subscribe(book => {
        this.book = book;
      });
    } else {
      this.isEditMode = false;
      this.book = { name: '', author: '', description: '' };
    }
  }
  saveBook(): void {
    if (!this.book) return;
    const bookData: BookInput = {
      name: this.book.name,
      author: this.book.author,
      description: this.book.description
    };
    if (this.isEditMode && this.bookId) {
      this.firestoreService.updateBook(this.bookId, bookData)
        .then(() => this.router.navigate(['/books', this.bookId]))
        .catch(err => console.error(err));
    } else {
      this.firestoreService.addBook(bookData)
        .then(docRef => this.router.navigate(['/books', docRef.id]))
        .catch(err => console.error(err));
    }
  }
  cancel(): void {
    if (this.isEditMode && this.bookId) {
      this.router.navigate(['/books', this.bookId]);
    } else {
      this.router.navigate(['/books']);
    }
  }
  clearForm(): void {
    if (!this.book) return;
    this.book.name = '';
    this.book.author = '';
    this.book.description = '';
  }
}