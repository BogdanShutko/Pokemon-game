import { useHistory } from "react-router";
import PokemonsJSON from "../../data/Pokemons.json";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { useState } from "react";
import s from "./style.module.css";

const GamePage = () => {
  const POKEMONS = PokemonsJSON;
  const [pokemons, setPokemons] = useState(() => [...POKEMONS]);

  const history = useHistory();
  const handlerClick = () => {
    history.push("/");
  };
  const flipCard = (id) => {
    setPokemons((prevState) =>
      prevState.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, active: !pokemon.active } : pokemon
      )
    );
  };
  return (
    <div>
      <div className={s.flex}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            values={pokemon.values}
            name={pokemon.name}
            img={pokemon.img}
            id={pokemon.id}
            type={pokemon.type}
            isActive={pokemon.active}
            flipCard={flipCard}
          />
        ))}
      </div>
      <button className="button" onClick={handlerClick}>
        Back To HomePage
      </button>
    </div>
  );
};

export default GamePage;
