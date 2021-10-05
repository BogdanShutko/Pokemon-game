import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import Modal from "../../components/Modal/Modal";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";
import { NotificationManager } from "react-notifications";

const MenuHeader = ({ bgActive }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [active, setActive] = useState(false);
  const changeState = () => {
    setActive((prevState) => !prevState);
  };

  const handlerClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password, auth }) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };
    if (!auth) {
      const responce = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYS5eAvMigqgwYdAL_bG_yu4FLz7_2MbQ",
        requestOptions
      ).then((res) => res.json());
      localStorage.setItem("idToken", responce.idToken);
      console.log(responce);
      if (responce.hasOwnProperty("error")) {
        NotificationManager.error(responce.error.message, "WRONG!");
      } else NotificationManager.success("A NEW USER WAS REGISTERED");
    } else {
      const responce = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYS5eAvMigqgwYdAL_bG_yu4FLz7_2MbQ",
        requestOptions
      ).then((res) => res.json());
      if (responce.hasOwnProperty("error")) {
        NotificationManager.error(responce.error.message, "WRONG!");
      } else NotificationManager.success("WELCOME");
      console.log(responce);
    }
    handlerClickLogin();
  };

  return (
    <div>
      <Menu checkActive={active} changeActive={changeState} />
      <Navbar
        checkActive={active}
        bgActive={bgActive}
        changeActive={changeState}
        onClickLogin={handlerClickLogin}
      />

      <Modal
        isOpen={isOpenModal}
        onCloseModal={handlerClickLogin}
        title="Authefication"
      >
        <LoginForm isOpenModal={isOpenModal} onSubmit={handleSubmitLoginForm} />
      </Modal>
    </div>
  );
};

export default MenuHeader;
