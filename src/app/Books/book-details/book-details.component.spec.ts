// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BookDetailsComponent } from './book-details.component';

// describe('BookDetailsComponent', () => {
//   let component: BookDetailsComponent;
//   let fixture: ComponentFixture<BookDetailsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [BookDetailsComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BookDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


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
  bookId!: number; // Изменили тип на number
  book$!: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Превращаем строку "1" в число 1 с помощью Number()
    const idParam = this.route.snapshot.paramMap.get('id');
    this.bookId = idParam ? Number(idParam) : 0;
    
    this.book$ = this.firestoreService.getBook(this.bookId);
  }

  deleteBook() {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      // .subscribe вместо .then
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
