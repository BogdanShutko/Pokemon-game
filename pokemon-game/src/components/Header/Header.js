import { useHistory } from "react-router";
import style from "./style.module.css";

const Header = (props) => {
  const history = useHistory();
  const handlerClick = () => {
    history.push("/game");
  };
  return (
    <header className={style.root}>
      <div className={style.forest}></div>
      <div className={style.silhouette}></div>
      <div className={style.moon}></div>
      <div className={style.container}>
        <h1>{props.title}</h1>
        <p>{props.descr}</p>
        <button className="button" onClick={handlerClick}>
          Start Game
        </button>
      </div>
    </header>
  );
};

export default Header;
