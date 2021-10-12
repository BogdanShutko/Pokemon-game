import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsAsync,
  selectPokemonsData,
} from "../../../../store/pokemons";
import { fetchUser, removeUser, selectUserData } from "../../../../store/users";

const UserPage = () => {
  const pokemonsRedux = useSelector(selectPokemonsData);
  const userData = useSelector(selectUserData);
  const [pokemons, setPokemons] = useState({});
  const dispatch = useDispatch();

  const toLocalTime = (date) =>
    new Date(parseInt(date, 10)).toLocaleString("uk-UA");

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);
  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const onClickLogOut = (evt) => {
    evt.preventDefault();
    localStorage.removeItem("idToken");
    dispatch(fetchUser());
    dispatch(removeUser());
  };

  return (
    <div className={s.page}>
      <h1>Your Account:</h1>
      <div className={s.stats}>
        <p> Name: {userData.email} </p>
        <p>Created: {toLocalTime(userData.createdAt)}</p>
        <p>Last visit: {toLocalTime(userData.lastLoginAt)}</p>
        <button onClick={onClickLogOut}>Log Out</button>
      </div>
      <p className={s.promt}>Your cards:</p>
      <div className={s.flex}>
        {Object.entries(pokemons).map(
          ([key, { name, img, id, type, values }]) => (
            <PokemonCard
              className={s.card}
              key={key}
              objID={key}
              name={name}
              img={img}
              id={id}
              type={type}
              values={values}
              isActive={true}
            />
          )
        )}
      </div>
    </div>
  );
};

export default UserPage;
