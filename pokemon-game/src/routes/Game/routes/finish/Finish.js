import { useContext } from "react";
import { PokemonContext } from "../../../../components/context/pokemonContext";
import { FireBaseContext } from "./../../../../components/context/firebaseContext";
import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  addPokemonToDb,
  clearState,
  firstPlayerPokemons,
  secondPlayerPokemons,
  winner,
} from "../../../../store/pokemons";
import { useDispatch } from "react-redux";

const FinishPage = () => {
  const firstPlayer = useSelector(firstPlayerPokemons);
  const secondPlayer = useSelector(secondPlayerPokemons);
  const secondPlayer2 = [...secondPlayer];
  const winnerPlayer = useSelector(winner);
  const dispatch = useDispatch();

  const history = useHistory();

  const [selectedCard, setSelectedCard] = useState(null);
  const [player2, setPlayer2] = useState(
    secondPlayer2.map((item) => ({ ...item, isSelected: false }))
  );

  const pickCard = (key) => {
    setPlayer2((prevState) => {
      return prevState.reduce((acc, item) => {
        item.isSelected = false;
        if (item.id === key) {
          setSelectedCard(item);
          item.isSelected = true;
        }
        acc.push(item);
        return acc;
      }, []);
    });
  };

  return (
    <div>
      <div className={s.flex}>
        {Object.values(firstPlayer).map((card) => {
          return <PokemonCard {...card} isActive={true}></PokemonCard>;
        })}
      </div>
      <div className={cn(s.flex, s.button)}>
        <button
          disabled={winnerPlayer === 1 && selectedCard === null}
          onClick={() => {
            if (selectedCard !== null) {
              delete selectedCard.isSelected;
              dispatch(addPokemonToDb(selectedCard));
            }
            dispatch(clearState());
            history.push("/game");
          }}
        >
          {" "}
          PLAY AGAIN
        </button>
      </div>
      <div className={s.flex}>
        {player2.map((card, index) => {
          return (
            <PokemonCard
              handlerSelect={() => {
                if (winnerPlayer === 1) {
                  pickCard(card.id);
                }
              }}
              key={index}
              id={card.id}
              name={card.name}
              type={card.type}
              img={card.img}
              values={card.values}
              possession="red"
              isSelected={card.isSelected}
              isActive
            ></PokemonCard>
          );
        })}
      </div>
    </div>
  );
};

export default FinishPage;
