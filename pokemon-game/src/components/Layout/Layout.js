import style from "./style.module.css";

const Layout = (props) => {
  const backgroundImage = `url(${props.urlBg})`;
  const styles = {
    backgroundColor: props.colorBg || null,
    backgroundImage: backgroundImage || null,
  };
  return (
    <section className={style.root} style={styles}>
      <div className={style.wrapper}>
        <article>
          <div className={style.title}>
            <h3>{props.title}</h3>
            <span className={style.separator}></span>
          </div>
          <div className={`${style.desc} ${style.full}`}>
            <p>{props.descr}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
