import { useContext } from "react";
import { PokemonContext } from "../../../../components/context/pokemonContext";
import { FirebaseContext } from "./../../../../components/context/firebaseContext";
import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { useState } from "react";
const FinishPage = () => {
  //  const handlerSelect = (key) => {
  //    const pokemon = { ...pokemons[key] };
  //    pokemonsContext.onSelectedPokemons(key, pokemon);
  //    setPokemons((prevState) => ({
  //      ...prevState,
  //      [key]: {
  //        ...prevState[key],
  //        selected: !prevState[key].selected,
  //      },
  //    }));
  //  };

  // handlerSelect={() => handlerSelect(key)}

  //  const handlerClick = () => {
  //   handlerSelect && handlerSelect(key);
  // };
  // return (
  //   <div
  //     className={cn(className, s.pokemonCard, {
  //       [s.active]: isActive,
  //       [s.selected]: isSelected,
  //     })}
  //     onClick={handlerClick}
  //   ></div>

  const history = useHistory();

  const { pokemons, clearContext, pokemons2, winner } =
    useContext(PokemonContext);
  const database = useContext(FirebaseContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [player2, setPlayer2] = useState(pokemons2);

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

  console.log("$$$$$$: ", pokemons2);
  console.log(database);
  return (
    <div>
      <div className={s.flex}>
        {Object.values(pokemons).map((card) => {
          return <PokemonCard {...card} isActive={true}></PokemonCard>;
        })}
      </div>
      <div className={cn(s.flex, s.button)}>
        <button
          disabled={winner === 1 && selectedCard === null}
          onClick={() => {
            if (selectedCard !== null) {
              delete selectedCard.isSelected;
              database.addPokemon(selectedCard);
            }
            clearContext();
            history.push("/game");
          }}
        >
          {" "}
          PLAY AGAIN
        </button>
      </div>
      <div className={s.flex}>
        {pokemons2.map((card, index) => {
          return (
            <PokemonCard
              handlerSelect={() => {
                if (winner === 1) {
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
