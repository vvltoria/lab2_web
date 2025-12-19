import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FirestoreService, Book } from '../services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  bookId!: number;
  book$!: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.bookId = idParam ? Number(idParam) : 0;
    this.book$ = this.firestoreService.getBook(this.bookId);
  }

  deleteBook() {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      this.firestoreService.deleteBook(this.bookId).subscribe({
        next: () => {
          console.log('Книга удалена');
          this.router.navigate(['/books']);
        },
        error: (err) => console.error('Ошибка при удалении:', err)
      });
    }
  }
}