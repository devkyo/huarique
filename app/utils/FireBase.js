import firebase from 'firebase/app'

const firebaseConfig = {
   apiKey: "AIzaSyAheeYJvWPGbP1VIk5J2ruTcngkDJ1hNE8",
   authDomain: "restaurant-1224f.firebaseapp.com",
   databaseURL: "https://restaurant-1224f.firebaseio.com",
   projectId: "restaurant-1224f",
   storageBucket: "restaurant-1224f.appspot.com",
   messagingSenderId: "217018780643",
   appId: "1:217018780643:web:21b93d39a83d819e0eeed6"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)