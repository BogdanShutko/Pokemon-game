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
  );
};

export default GamePage;
