// import { Injectable } from '@angular/core';
// import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, CollectionReference } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { Book } from '../mock-book-list';

// export interface BookInput {
//   name: string;
//   author: string;
//   description: string;
// }

// export interface BookWithId extends BookInput {
//   id: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class FirestoreService {
//   private booksCollection: CollectionReference;

//   constructor(private firestore: Firestore) { 
//     this.booksCollection = collection(this.firestore, 'books');
//   }

//   getBooks(): Observable<BookWithId[]> {
//     return collectionData(this.booksCollection, { idField: 'id' }) as Observable<BookWithId[]>;
//   }

//   getBook(id: string): Observable<BookWithId> {
//     const bookDoc = doc(this.firestore, `books/${id}`);
//     return docData(bookDoc, { idField: 'id' }) as Observable<BookWithId>;
//   }

//   addBook(book: BookInput) {
//     return addDoc(this.booksCollection, book);
//   }

//   updateBook(id: string, book: BookInput) {
//     const bookDoc = doc(this.firestore, `books/${id}`);
//     return updateDoc(bookDoc, { ...book });
//   }

//   deleteBook(id: string) {
//     const bookDoc = doc(this.firestore, `books/${id}`);
//     return deleteDoc(bookDoc);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- Новые интерфейсы, совпадающие с Java (Book.java) ---

export interface Author {
  id?: number;
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface Book {
  id?: number;
  title: string;          // В Java поле называется title (раньше было name)
  author: Author | null;  // В Java это целый объект, а не просто строка
  genre?: string;
  publicationYear?: number;
  isbn?: string;
  totalCopies?: number;
}

// Оставляем этот алиас, чтобы старый код в компонентах не ругался
export type BookWithId = Book; 
export type BookInput = Book;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  // Адрес вашего Java-сервера (поправили порт на 8082 и путь)
  private apiUrl = 'http://localhost:8082/DemoSpring/books';

  constructor(private http: HttpClient) { }

  // 1. Получить все книги (GET)
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // 2. Добавить книгу (POST)
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // 3. Удалить книгу (DELETE)
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 4. Обновить книгу (PUT)
  // Обратите внимание: id теперь number, а не string
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }
  
  // Метод для получения одной книги
  getBook(id: number): Observable<Book> {
      return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
}