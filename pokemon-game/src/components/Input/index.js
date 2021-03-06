import s from "./style.module.css";
const Input = ({ value, label, type = "text", name, onChange, required }) => {
  return (
    <div className={s.root}>
      <input
        name={name}
        type={type}
        value={value}
        className={s.input}
        onChange={onChange}
        required={required}
      />
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>{label}</label>
    </div>
  );
};

export default Input;
