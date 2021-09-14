import s from "./style.module.css";
import cn from "classnames";

const Navbar = ({ checkActive, changeActive }) => {
  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a
          className={cn(s.menuButton, { [s.active]: checkActive })}
          onClick={changeActive}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
