// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes), 
//     provideFirebaseApp(() => initializeApp({
//       projectId: "library-app-lab",
//       appId: "1:245678529717:web:c0816997a3c31b811802b7",
//       storageBucket: "library-app-lab.appspot.com",
//       apiKey: "...", 
//       authDomain: "library-app-lab.firebaseapp.com",
//       messagingSenderId: "245678529717",
//       measurementId: "G-KYY9Q6VJRJ"
//     })), 
//     provideFirestore(() => getFirestore())
//   ]
// };


import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http'; // <-- 1. Важный импорт

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. Добавляем provideHttpClient() для работы с сервером
    provideHttpClient(), 
    
    // Firebase пока оставляем, чтобы не ломать сборку, 
    // но пользоваться будем уже своим сервером
    provideFirebaseApp(() => initializeApp({
      projectId: "library-app-lab",
      appId: "1:245678529717:web:c0816997a3c31b811802b7",
      storageBucket: "library-app-lab.appspot.com",
      apiKey: "...", 
      authDomain: "library-app-lab.firebaseapp.com",
      messagingSenderId: "245678529717",
      measurementId: "G-KYY9Q6VJRJ"
    })), 
    provideFirestore(() => getFirestore())
  ]
};