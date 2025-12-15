import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../mock-book-list';

export interface BookInput {
  name: string;
  author: string;
  description: string;
}

export interface BookWithId extends BookInput {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private booksCollection: CollectionReference;

  constructor(private firestore: Firestore) { 
    this.booksCollection = collection(this.firestore, 'books');
  }

  getBooks(): Observable<BookWithId[]> {
    return collectionData(this.booksCollection, { idField: 'id' }) as Observable<BookWithId[]>;
  }

  getBook(id: string): Observable<BookWithId> {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return docData(bookDoc, { idField: 'id' }) as Observable<BookWithId>;
  }

  addBook(book: BookInput) {
    return addDoc(this.booksCollection, book);
  }

  updateBook(id: string, book: BookInput) {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return updateDoc(bookDoc, { ...book });
  }

  deleteBook(id: string) {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return deleteDoc(bookDoc);
  }
}