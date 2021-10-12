import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons";
import userReducer from "./users";
export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    user: userReducer,
  },
});
