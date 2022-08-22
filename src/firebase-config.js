// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyD1lkso6TL3nI1W6kGUGX-5rYxZX95wfjc",
	authDomain: "movie-recommendation-172d3.firebaseapp.com",
	projectId: "movie-recommendation-172d3",
	storageBucket: "movie-recommendation-172d3.appspot.com",
	messagingSenderId: "1035005728197",
	appId: "1:1035005728197:web:66846876a7337f82a727ac",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
