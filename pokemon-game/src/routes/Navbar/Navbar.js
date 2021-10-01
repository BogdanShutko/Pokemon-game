import s from "./style.module.css";
import cn from "classnames";
import { ReactComponent as LoginSVG } from "../../assets/Auth.svg";

const Navbar = ({ onClickLogin, checkActive, bgActive, changeActive }) => {
  return (
    <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap} onClick={onClickLogin}>
            <LoginSVG />
          </div>
          <div
            className={cn(s.menuButton, { [s.active]: checkActive })}
            onClick={changeActive}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
