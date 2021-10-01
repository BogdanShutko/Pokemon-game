import s from "./style.module.css";
import { useEffect, useState } from "react";
import Input from "../Input";

const LoginForm = ({ onSubmit, isOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setPassword("");
    setEmail("");
  }, [isOpenModal]);
  const handlerSubmit = (e) => {
    e.preventDefault();
    onSubmit &&
      onSubmit({
        email,
        password,
        auth,
      });
    setEmail("");
    setPassword("");
  };
  return (
    <form className={s.root} onSubmit={handlerSubmit}>
      <div>
        <Input
          type="email"
          name="email"
          label="Enter e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          label="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>Email</label>
      <div>
        <button className={s.btn1}>{auth ? "Sign in" : "Sign Up"}</button>

        <button
          className={s.btn2}
          onClick={() => setAuth((prevState) => !prevState)}
        >
          {auth ? "Make new player" : "Switch to sign in"}!
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
