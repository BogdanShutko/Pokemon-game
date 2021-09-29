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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonsOnce = async () => {
    return await this.database
      .ref("pokemons")
      .once("value")
      .then((snapshot) => snapshot.val());
  };

  getPokemonSocket = (cb) => {
    this.database.ref("pokemons").on("value", (snapshot) => {
      cb(snapshot.val());
    });
  };

  getOffPokemonSocket = () => {
    this.database.ref("pokemons").off();
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child("pokemons").push().key;
    this.database.ref("pokemons/" + newKey).set(data);
  };
}

const FirebaseClass = new Firebase();

export default FirebaseClass;
