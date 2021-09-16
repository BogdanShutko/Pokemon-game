import s from "./style.module.css";
import cn from "classnames";

const Navbar = ({ checkActive, bgActive, changeActive }) => {
  return (
    <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div
          className={cn(s.menuButton, { [s.active]: checkActive })}
          onClick={changeActive}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
