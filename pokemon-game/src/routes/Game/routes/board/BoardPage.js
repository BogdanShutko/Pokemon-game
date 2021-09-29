import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import {
  addSecondPokemonsAsync,
  changeWinner,
  firstPlayerPokemons,
  secondPlayerPokemons,
  winner,
} from "../../../../store/pokemons";
import PlayerBoard from "./component/PlayerBoard";
import s from "./style.module.css";

const BoardPage = () => {
  const firstPlayer = useSelector(firstPlayerPokemons);
  const secondPlayer = useSelector(secondPlayerPokemons);
  const history = useHistory();

  if (Object.keys(firstPlayer).length !== 5) {
    history.replace("/game");
  }

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(firstPlayer).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });
  const [player2, setPlayer2] = useState([]);
  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const dispatch = useDispatch();

  useEffect(async () => {
    const boardResponse = await fetch(
      "https://reactmarathon-api.netlify.app/api/board"
    );
    const boardRequest = await boardResponse.json();

    const playerTwoResponse = await fetch(
      "https://reactmarathon-api.netlify.app/api/create-player"
    );

    const playerTwoRequest = await playerTwoResponse.json();
    dispatch(addSecondPokemonsAsync(playerTwoRequest.data));

    setPlayer2(() => {
      return playerTwoRequest.data.map((item) => ({
        ...item,
        possession: "red",
      }));
    });

    // await changePokemons2(playerTwoRequest);
    setBoard(boardRequest.data);
  }, []);

  const handlerClickBoardPlate = async (position) => {
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
  const winnerPlayer = useSelector(winner);
  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);
      if (count1 > count2) {
        dispatch(changeWinner(1));
        console.log(winnerPlayer);
        alert("WIN");
        history.replace("/game/finish");
      } else if (count2 > count1) {
        dispatch(changeWinner(2));
        console.log(winnerPlayer);
        alert("LOSE");
        history.replace("/game/finish");
      } else {
        console.log(winnerPlayer);
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
