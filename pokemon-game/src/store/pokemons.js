import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    getPokemons: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const { getPokemons } = slice.actions;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;

export const selectPokemonsData = (state) => state.pokemons.data;

export default slice.reducer;
