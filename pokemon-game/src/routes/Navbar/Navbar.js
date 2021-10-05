import s from "./style.module.css";
import cn from "classnames";
import { ReactComponent as LoginSVG } from "../../assets/Auth.svg";
import { ReactComponent as UserSVG } from "../../assets/user.svg";
import { useSelector } from "react-redux";
import { selectUserLoading, selectUserLocalID } from "../../store/users";
import { Link } from "react-router-dom";

const Navbar = ({ onClickLogin, checkActive, bgActive, changeActive }) => {
  const isLoading = useSelector(selectUserLoading);
  const localId = useSelector(selectUserLocalID);
  console.log(isLoading, localId);
  return (
    <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          {!isLoading && !localId && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <LoginSVG />
            </div>
          )}
          {!isLoading && localId && (
            <Link className={s.loginWrap} to="/user">
              <UserSVG />
            </Link>
          )}
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
