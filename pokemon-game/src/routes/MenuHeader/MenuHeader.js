import { useState } from "react";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";

const MenuHeader = ({ bgActive }) => {
  const [active, setActive] = useState(false);
  const changeState = () => {
    setActive((prevState) => !prevState);
  };
  return (
    <div c>
      <Menu checkActive={active} changeActive={changeState} />
      <Navbar
        checkActive={active}
        bgActive={bgActive}
        changeActive={changeState}
      />
    </div>
  );
};

export default MenuHeader;
