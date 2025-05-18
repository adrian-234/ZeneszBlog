import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "zeneszblog-c7b35", appId: "1:405435612786:web:c06d31da4826f43f6d0ceb", storageBucket: "zeneszblog-c7b35.firebasestorage.app", apiKey: "AIzaSyDj56tRbYo0S2OtFDuhuHM74__LWRJURPQ", authDomain: "zeneszblog-c7b35.firebaseapp.com", messagingSenderId: "405435612786" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
