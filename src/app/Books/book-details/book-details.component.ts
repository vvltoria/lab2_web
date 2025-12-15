import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService, BookWithId } from '../services/firestore.service';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<BookWithId>;
  private bookId: string = ''; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bookId) {
      this.book$ = this.firestoreService.getBook(this.bookId);
    }
  }
  deleteBook(): void {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить эту книгу?');
    if (isConfirmed && this.bookId) {
      this.firestoreService.deleteBook(this.bookId)
        .then(() => {
          window.alert('Книга была успешно удалена.');
          this.router.navigate(['/books']);
        })
        .catch(error => console.error('Ошибка при удалении книги:', error));
    }
  }
}