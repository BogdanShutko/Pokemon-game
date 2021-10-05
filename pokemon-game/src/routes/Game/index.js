import { useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { PokemonContext } from "../../components/context/pokemonContext";
import BoardPage from "./routes/board/BoardPage";
import FinishPage from "./routes/finish/Finish";
import StartPage from "./routes/start/StartPage";

const GamePage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/`} exact component={StartPage} />
      <Route path={`${match.path}/board`} component={BoardPage} />
      <Route path={`${match.path}/finish`} component={FinishPage} />
    </Switch>
  );
};

export default GamePage;
