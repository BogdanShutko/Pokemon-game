import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";

export const slice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    data: {},
    firstPlayerPokemons: {},
    secondPlayerPokemons: [],
    winner: 0,
    error: null,
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    addFirstPlayerPokemons: (state, action) => ({
      ...state,
      isLoading: false,
      firstPlayerPokemons: action.payload,
    }),
    addSecondPlayerPokemons: (state, action) => ({
      ...state,
      isLoading: false,
      secondPlayerPokemons: action.payload,
    }),
    changeWinner: (state, action) => ({
      ...state,
      winner: action.payload,
    }),
    clearState: (state) => ({
      isLoading: false,
      data: {},
      firstPlayerPokemons: {},
      secondPlayerPokemons: [],
      winner: 0,
      error: null,
    }),
  },
});

export const {
  fetchPokemons,
  fetchPokemonResolve,
  fetchPokemonReject,
  addFirstPlayerPokemons,
  addSecondPlayerPokemons,
  changeWinner,
  clearState,
} = slice.actions;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;

export const selectPokemonsData = (state) => state.pokemons.data;

export const firstPlayerPokemons = (state) =>
  state.pokemons.firstPlayerPokemons;

export const winner = (state) => state.pokemons.winner;

export const secondPlayerPokemons = (state) =>
  state.pokemons.secondPlayerPokemons;

export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonResolve(data));
};

export const addPokemonsAsync = (data) => async (dispatch) => {
  dispatch(fetchPokemons());
  await dispatch(addFirstPlayerPokemons(data));
};

export const addSecondPokemonsAsync = (data) => async (dispatch) => {
  dispatch(fetchPokemons());
  await dispatch(addSecondPlayerPokemons(data));
};

export const addPokemonToDb = (data) => async (dispatch) => {
  const addFunction = await FirebaseClass.addPokemon(data);
};

export default slice.reducer;
