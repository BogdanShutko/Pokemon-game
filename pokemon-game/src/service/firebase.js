import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBYS5eAvMigqgwYdAL_bG_yu4FLz7_2MbQ",
  authDomain: "pokemon-game-d7dc9.firebaseapp.com",
  databaseURL:
    "https://pokemon-game-d7dc9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-d7dc9",
  storageBucket: "pokemon-game-d7dc9.appspot.com",
  messagingSenderId: "804413097385",
  appId: "1:804413097385:web:bb634e8bc3aa60594070b8",
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;
