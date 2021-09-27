import PokemonCard from "../../../../../../components/PokemonCard/PokemonCard";
import s from "./style.module.css";
import cn from "classnames";
import { useState } from "react";

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [isSelected, setSelected] = useState(null);
  return (
    <>
      {cards.map((item) => {
        return (
          <div
            onClick={() => {
              console.log(item);
              setSelected(item.id);
              onClickCard && onClickCard({ ...item, player });
            }}
            className={cn(s.cardBoard, {
              [s.selected]: isSelected === item.id,
            })}
          >
            <PokemonCard
              key={item.id}
              values={item.values}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              minimize
              isActive={true}
            />
          </div>
        );
      })}
    </>
  );
};

export default PlayerBoard;
