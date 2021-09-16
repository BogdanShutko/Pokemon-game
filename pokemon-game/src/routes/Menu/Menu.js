import cn from "classnames";
import { Link } from "react-router-dom";
import s from "./style.module.css";

const MENU = [
  {
    title: "HOME",
    to: "/",
  },
  {
    title: "GAME",
    to: "/game",
  },
  {
    title: "ABOUT",
    to: "/about",
  },
  {
    title: "CONTACT",
    to: "/contact",
  },
];

const Menu = ({ checkActive, changeActive }) => {
  return (
    <div
      className={cn(
        s.menuContainer,
        { [s.active]: checkActive === true },
        { [s.deactive]: checkActive === false }
      )}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {MENU.map(({ title, to }, index) => {
            return (
              <li key={index}>
                <Link to={to} onClick={changeActive}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;

{
  /* <li>
            <a href="#welcome">HOME</a>
          </li>
          <li>
            <a href="#game">GAME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li> */
}
