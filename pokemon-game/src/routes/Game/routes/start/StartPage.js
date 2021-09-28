import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { useState, useEffect, useContext } from "react";
import { FireBaseContext } from "../../../../components/context/firebaseContext";
import { PokemonContext } from "../../../../components/context/pokemonContext";
import { useHistory } from "react-router";
import cn from "classnames";

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(PokemonContext);
  const [pokemons, setPokemons] = useState({});
  // const dispatch = useDispatch();
  // const pokemonRedux = useSelector(selectPokemonsData);

  useEffect(() => {
    firebase.getPokemonSocket((pokemons) => setPokemons(pokemons));
    console.log(pokemons);
    // dispatch(getPokemons(pokemons));
    return () => {
      firebase.getOffPokemonSocket();
    };
  }, []);

  const history = useHistory();
  const handlerClick = () => {
    history.push("/");
  };
  const handlerSelect = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonsContext.onSelectedPokemons(key, pokemon);
    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handlerGoBoard = () => {
    history.push("/game/board");
  };

  return (
    <div>
      <div className={s.flexbutton}>
        <button
          className={cn(s.button)}
          onClick={handlerGoBoard}
          disabled={Object.keys(pokemonsContext.pokemons).length < 5}
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
                Object.keys(pokemonsContext.pokemons).length < 5 ||
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
