// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCojJdsQq0dn4IYrD-wYcAtzmg5pVPlwQ0",
  authDomain: "insta-2-yt-f61bc.firebaseapp.com",
  projectId: "insta-2-yt-f61bc",
  storageBucket: "insta-2-yt-f61bc.appspot.com",
  messagingSenderId: "67451185227",
  appId: "1:67451185227:web:6e357bfd03b5539b8845ce"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }
