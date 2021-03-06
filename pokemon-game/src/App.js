import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import About from "./routes/about/about";
import Contact from "./routes/Contact/contact";
import MenuHeader from "./routes/MenuHeader/MenuHeader";

import NotFound from "./routes/NotFound/NotFound";
import s from "./style.module.css";
import cn from "classnames";
import { FireBaseContext } from "./components/context/firebaseContext";
import Firebase from "./service/firebase";
import { useLocation } from "react-router";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import PrivateRoute from "./components/PrivateComponent";
import { useEffect } from "react";
import { getUserAsync, selectUserLoading } from "./store/users";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserPage from "./routes/Game/routes/UserPage";

const App = () => {
  useEffect(() => {
    dispatch(getUserAsync());
  }, []);
  const isLoading = useSelector(selectUserLoading);
  const dispatch = useDispatch();
  const location = useLocation();
  if (isLoading) {
    return "LOADING...";
  }
  const isPadding =
    location.pathname === "/" || location.pathname === "/game/board";

  return (
    <FireBaseContext.Provider value={Firebase}>
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
                <PrivateRoute path="/user" component={UserPage}></PrivateRoute>
                <PrivateRoute path="/home" component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={About}></PrivateRoute>
                <PrivateRoute
                  path="/contact"
                  component={Contact}
                ></PrivateRoute>
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
      <NotificationContainer />
    </FireBaseContext.Provider>
  );
};

export default App;
