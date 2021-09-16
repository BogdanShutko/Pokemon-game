import { useState } from "react";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";

const MenuHeader = () => {
  const [active, setActive] = useState(false);
  const changeState = () => {
    setActive((prevState) => !prevState);
  };
  return (
    <div>
      <Menu checkActive={active} />
      <Navbar checkActive={active} changeActive={changeState} />
    </div>
  );
};

export default MenuHeader;
