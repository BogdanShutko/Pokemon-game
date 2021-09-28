import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PokemonContext } from "../../../../components/context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import PlayerBoard from "./component/PlayerBoard";
import s from "./style.module.css";

const BoardPage = () => {
  const { pokemons, pokemons2, changePokemons2, changeWinner } =
    useContext(PokemonContext);

  const history = useHistory();
  if (Object.keys(pokemons).length === 0) {
    history.replace("/game");
  }

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(pokemons).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });
  const [player2, setPlayer2] = useState([]);
  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);

  useEffect(async () => {
    const boardResponse = await fetch(
      "https://reactmarathon-api.netlify.app/api/board"
    );
    const boardRequest = await boardResponse.json();

    const playerTwoResponse = await fetch(
      "https://reactmarathon-api.netlify.app/api/create-player"
    );

    const playerTwoRequest = await playerTwoResponse.json();

    setPlayer2(() => {
      return playerTwoRequest.data.map((item) => ({
        ...item,
        possession: "red",
      }));
    });

    await changePokemons2(playerTwoRequest);
    setBoard(boardRequest.data);
    console.log(pokemons2);
  }, []);

  const handlerClickBoardPlate = async (position) => {
    console.log(pokemons2);
    if (choiceCard) {
      const params = {
        position,
        card: choiceCard,
        board,
      };

      const res = await fetch(
        "https://reactmarathon-api.netlify.app/api/players-turn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      const request = await res.json();
      setBoard(request.data);
    }

    if (choiceCard.player === 1) {
      setPlayer1((prevState) =>
        prevState.filter((item) => item.id !== choiceCard.id)
      );
    }

    if (choiceCard.player === 2) {
      setPlayer2((prevState) =>
        prevState.filter((item) => item.id !== choiceCard.id)
      );
    }
    setSteps((prevState) => {
      const count = prevState + 1;
      return count;
    });
  };

  const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;
    board.forEach((item, index) => {
      if (item.card.possession === "blue") {
        player1Count++;
      } else if (item.card.possession === "red") player2Count++;
    });
    return [player1Count, player2Count];
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);
      if (count1 > count2) {
        changeWinner(1);
        alert("WIN");
        history.replace("/game/finish");
      } else if (count2 > count1) {
        changeWinner(2);
        alert("LOSE");
        history.replace("/game/finish");
      } else {
        changeWinner(0);
        alert("DRAW");
        history.replace("/game/finish");
      }
    }
  }, [steps]);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {
          <PlayerBoard
            player={1}
            onClickCard={(card) => setChoiceCard(card)}
            cards={player1}
          ></PlayerBoard>
        }
      </div>
      <div className={s.board}>
        {board.map((item) => {
          return (
            <div
              key={item.position}
              className={s.boardPlate}
              onClick={() =>
                !item.card && handlerClickBoardPlate(item.position)
              }
            >
              ({item.card && <PokemonCard {...item.card} isActive minimize />})
            </div>
          );
        })}
      </div>
      <div className={s.playerTwo}>
        {
          <PlayerBoard
            player={2}
            cards={player2}
            onClickCard={(card) => setChoiceCard(card)}
          ></PlayerBoard>
        }
      </div>
    </div>
  );
};

export default BoardPage;
