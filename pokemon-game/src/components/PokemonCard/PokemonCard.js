import s from "./s.module.css";
import BackSide from "../../assets/card-back-side.jpg";
import { useState } from "react";
import cn from "classnames";

const PokemonCard = ({
  values,
  img,
  id,
  name,
  type,
  isActive,
  isSelected,
  handlerSelect,
  possession,
  key,
}) => {
  const handlerClick = () => {
    handlerSelect && handlerSelect(key);
  };
  return (
    <div className={s.root}>
      <div
        onClick={handlerClick}
        className={cn(s.pokemonCard, {
          [s.active]: isActive,
          [s.selected]: isSelected,
        })}
      >
        <div className={s.cardFront}>
          <div className={cn(s.wrap, s.front)}>
            <div
              className={cn(s.pokemon, s[type])}
              s={{ backgroundColor: possession }}
            >
              <div className={s.values}>
                <div className={cn(s.count, s.top)}>{values.top}</div>
                <div className={cn(s.count, s.right)}>{values.right}</div>
                <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
                <div className={cn(s.count, s.left)}>{values.left}</div>
              </div>
              <div className={s.imgContainer}>
                <img src={img} alt={name} />
              </div>
              <div className={s.info}>
                <span className={s.number}>#{id}</span>
                <h3 className={s.name}>{name}</h3>
                <small className={s[type]}>
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className={s.cardBack}>
          <div className={cn(s.wrap, s.back)}>
            <img src={BackSide} alt="Сard Backed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
