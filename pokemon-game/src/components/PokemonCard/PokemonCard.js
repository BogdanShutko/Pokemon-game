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
<<<<<<< Updated upstream
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
=======
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
    <div
      className={cn(className, s.pokemonCard, {
        [s.active]: isActive,
        [s.selected]: isSelected,
      })}
      onClick={handlerClick}
    >
      <div className={s.cardFront}>
        <div className={cn(s.wrap, s.front)}>
          <div
            className={cn(s.pokemon, s[type])}
            style={{ backgroundColor: possession }}
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
            {!minimize && (
              <div className={s.info}>
                <span className={s.number}>#{id}</span>
                <h3 className={s.name}>{name}</h3>
                <small className={s.type}>
>>>>>>> Stashed changes
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
