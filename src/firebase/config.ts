// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCtwynAR1IoiVJV912lRO2kk83OIP-KbIs',
  authDomain: 'my-shot-ef9f2.firebaseapp.com',
  projectId: 'my-shot-ef9f2',
  storageBucket: 'my-shot-ef9f2.appspot.com',
  messagingSenderId: '881155628381',
  appId: '1:881155628381:web:968d97545a1b11921b5cb4',
  measurementId: 'G-EN9VS6QTWV'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
