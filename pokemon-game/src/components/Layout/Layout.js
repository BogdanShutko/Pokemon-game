import style from "./style.module.css";
import cn from "classnames";

const Layout = (props) => {
  const backgroundImage = props.urlBg ? `url(${props.urlBg})` : null;
  const styles = {
    backgroundColor: props.colorBg || null,
    backgroundImage,
  };
  return (
    <section className={style.root} style={styles}>
      <div className={style.wrapper}>
        <article>
          <div className={style.title}>
            <h3>{props.title}</h3>
            <span className={style.separator}></span>
          </div>
          <div className={cn(style.desc, style.full)}>
            <p>{props.children}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
