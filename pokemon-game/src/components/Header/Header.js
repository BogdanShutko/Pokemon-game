import style from "./style.module.css";
console.log(style);

const Header = (props) => {
  const handlerClick = (page) => {
    console.log("#####: <Header />");
    props.onClickButton && props.onClickButton("game");
  };
  return (
    <header className={style.root}>
      <div className={style.forest}></div>
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
