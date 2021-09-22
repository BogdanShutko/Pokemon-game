<<<<<<< Updated upstream
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
=======
import { useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { PokemonContext } from "../../components/context/pokemonContext";
import BoardPage from "./routes/board/BoardPage";
import FinishPage from "./routes/finish/Finish";
import StartPage from "./routes/start/StartPage";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const match = useRouteMatch();
  const handlerSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons((prevState) => {
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
  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemons,
        onSelectedPokemons: handlerSelectedPokemons,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
>>>>>>> Stashed changes
  );
};

export default GamePage;
