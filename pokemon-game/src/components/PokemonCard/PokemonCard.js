import style from "./style.module.css";
import BackSide from "../../assets/card-back-side.jpg";
import { useState } from "react";
import cn from "classnames";

const PokemonCard = ({
  values,
  img,
  id,
  name,
  type,
  isActive = false,
  flipCard,
  objId,
}) => {
  const handlerClick = () => {
    flipCard && flipCard(id, objId);
  };
  return (
    <div className={style.root} onClick={handlerClick}>
      <div
        className={cn(style.pokemonCard, style[type], {
          [style.active]: isActive,
        })}
      >
        <div className={style.cardFront}>
          <div className={cn(style.wrap, style.front)}>
            <div className={cn(style.pokemon, style[type])}>
              <div className={style.values}>
                <div className={cn(style.count, style.top)}>{values.top}</div>
                <div className={cn(style.count, style.right)}>
                  {values.right}
                </div>
                <div className={cn(style.count, style.bottom)}>
                  {values.bottom}
                </div>
                <div className={cn(style.count, style.left)}>{values.left}</div>
              </div>
              <div className={style.imgContainer}>
                <img src={img} alt={name} />
              </div>
              <div className={style.info}>
                <span className={style.number}>#{id}</span>
                <h3 className={style.name}>{name}</h3>
                <small className={style[type]}>
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className={style.cardBack}>
          <div className={cn(style.wrap, style.back)}>
            <img src={BackSide} alt="Сard Backed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
