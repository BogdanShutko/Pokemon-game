import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import cn from "classnames";
import { useDispatch } from "react-redux";
import {
  addFirstPlayerPokemons,
  addPokemonsAsync,
  firstPlayerPokemons,
  getPokemonsAsync,
  selectPokemonsData,
  selectPokemonsLoading,
} from "../../../../store/pokemons";
import { useSelector } from "react-redux";

const StartPage = () => {
  const firstPlayer = useSelector(firstPlayerPokemons);
  const [pokemons, setPokemons] = useState({});
  const dispatch = useDispatch();
  const pokemonRedux = useSelector(selectPokemonsData);
  console.log("#####: REDUX_POKEMONS:", pokemonRedux);
  useEffect(() => {
    dispatch(getPokemonsAsync(pokemons));
  }, []);
  useEffect(() => {
    setPokemons(pokemonRedux);
  }, [pokemonRedux]);

  const history = useHistory();
  const handlerClick = () => {
    history.push("/");
  };

  const [stateOfChosenPokemons, setStateOfChosenPokemons] = useState({});
  const handlerSelect = (key) => {
    const pokemon = { ...pokemons[key] };
    // pokemonsContext.onSelectedPokemons(key, pokemon);
    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
    setStateOfChosenPokemons((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  useEffect(() => {
    console.log(Object.keys(stateOfChosenPokemons).length);
    dispatch(addPokemonsAsync(stateOfChosenPokemons));
    console.log(firstPlayer);
  }, [stateOfChosenPokemons]);

  // const handlerSelectedPokemons = (key, pokemon) => {
  //   setSelectedPokemons((prevState) => {
  //     if (prevState[key]) {
  //       const copyState = { ...prevState };
  //       delete copyState[key];
  //       return copyState;
  //     }
  //     return {
  //       ...prevState,
  //       [key]: pokemon,
  //     };
  //   });
  // };

  const handlerGoBoard = () => {
    history.push("/game/board");
  };

  return (
    <div>
      <div className={s.flexbutton}>
        <button
          className={cn(s.button)}
          onClick={handlerGoBoard}
          disabled={Object.keys(stateOfChosenPokemons).length < 5}
        >
          Start Game
        </button>
      </div>
      <div className={s.flex}>
        {Object.entries(pokemons).map(([key, pokemon]) => (
          <PokemonCard
            className={s.card}
            key={key}
            objId={key}
            values={pokemon.values}
            name={pokemon.name}
            img={pokemon.img}
            id={pokemon.id}
            type={pokemon.type}
            isActive={true}
            isSelected={pokemon.selected}
            handlerSelect={() => {
              if (
                Object.keys(stateOfChosenPokemons).length < 5 ||
                pokemon.selected
              ) {
                handlerSelect(key);
              }
            }}
          />
        ))}
      </div>
      <div className={s.flexbutton}>
        <button className={cn(s.button)} onClick={handlerClick}>
          Back To HomePage
        </button>
      </div>
    </div>
  );
};

export default StartPage;
