import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import About from "./routes/about/about";
import Contact from "./routes/Contact/contact";
import MenuHeader from "./routes/MenuHeader/MenuHeader";
import Footer from "./components/Footer/Footer";
import NotFound from "./routes/NotFound/NotFound";
import s from "./style.module.css";
import cn from "classnames";

const App = () => {
  const match = useRouteMatch("/");
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div
              className={cn(s.wrap, {
                [s.isHomePage]: isPadding,
              })}
            >
              <Switch>
                <Route path="/" exact component={HomePage}></Route>
                <Route path="/home" component={HomePage} />
                <Route path="/game" component={GamePage}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route
                  render={() => {
                    return <Redirect to="/404" />;
                  }}
                />
              </Switch>
            </div>
          </>
        </Route>
      </Switch>
    </FirebaseContext.Provider>
  );
};

export default App;
