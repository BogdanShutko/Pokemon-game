<<<<<<< Updated upstream
import { useHistory } from "react-router";
import PokemonsJSON from "../../data/Pokemons.json";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { useState, useEffect } from "react";
import s from "./style.module.css";
import database from "../../service/firebase";
import cn from "classnames";

const GamePage = () => {
  const POKEMONS = PokemonsJSON;
  const [pokemons, setPokemons] = useState(() => [...POKEMONS]);

  useEffect(() => {
    database.ref("pokemons").once("value", (snapshot) => {
      setPokemons(snapshot.val());
    });
  });

  const history = useHistory();
  const handlerClick = () => {
    history.push("/");
  };
  const flipCard = (id, objId) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (item[0] === objId) {
          pokemon.active = !pokemon.active;
          database.ref("pokemons/" + objId).set({
            ...pokemon,
          });
        }

        acc[item[0]] = pokemon;
        return acc;
      }, {});
    });
  };

  const addNewPokemon = () => {
    const newKey = database.ref().child("pokemons").push().key;
    database.ref("pokemons/" + newKey).set(POKEMONS[0]);
  };
  return (
    <div>
      <div className={s.flex}>
        <button className={cn(s.button)} onClick={addNewPokemon}>
          ADD NEW POKEMON
        </button>
      </div>
      <div className={s.flex}>
        {Object.entries(pokemons).map(([key, pokemon]) => (
          <PokemonCard
            key={key}
            objId={key}
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
  const clearContext = () => {
    setSelectedPokemons({});
    setPokemons2([]);
    setWinner(null);
  };

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

  const [pokemons2data, setPokemons2] = useState([]);
  const [winner, setWinner] = useState(null);
  const changeWinner = (winner) => {
    setWinner(winner);
    console.log(winner);
  };
  const changePokemons2 = (data) => {
    setPokemons2(() => {
      return [...data.data];
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemons,
        pokemons2: pokemons2data,
        winner,
        changeWinner,
        changePokemons2,
        onSelectedPokemons: handlerSelectedPokemons,
        clearContext,
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
