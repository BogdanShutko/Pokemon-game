import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import Modal from "../../components/Modal/Modal";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { getUserAsync, getUserUpdateAsync } from "../../store/users";

const MenuHeader = ({ bgActive }) => {
  const dispatch = useDispatch();
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
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYS5eAvMigqgwYdAL_bG_yu4FLz7_2MbQ",
        requestOptions
      ).then((res) => res.json());
      localStorage.setItem("idToken", response.idToken);
      console.log(response);
      const pokemonsStarterpack = await fetch(
        "https://reactmarathon-api.herokuapp.com/api/pokemons/starter"
      ).then((res) => res.json());
      for (const item of pokemonsStarterpack.data) {
        await fetch(
          `https://pokemon-game-d7dc9-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`,
          {
            method: "POST",
            body: JSON.stringify(item),
          }
        );
      }
      dispatch(getUserUpdateAsync());
      console.log(pokemonsStarterpack);
      if (response.hasOwnProperty("error")) {
        NotificationManager.error(response.error.message, "WRONG!");
      } else {
        NotificationManager.success("A NEW USER WAS REGISTERED");
      }
    } else {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYS5eAvMigqgwYdAL_bG_yu4FLz7_2MbQ",
        requestOptions
      ).then((res) => res.json());
      localStorage.setItem("idToken", response.idToken);
      dispatch(getUserUpdateAsync());
      if (response.hasOwnProperty("error")) {
        NotificationManager.error(response.error.message, "WRONG!");
      } else NotificationManager.success("WELCOME");
      console.log(response);
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
