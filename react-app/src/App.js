import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Splash from "./components/Splash/Splash";
import Diary from "./components/Diary/Diary";
import Profile from "./components/Profile/Profile";
import Specs from "./components/auth/Specs";
import { authenticate } from "./store/session";

function App() {
  // const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/welcome" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="">
          <NavBar />
          <ProtectedRoute path="/specs" exact={true}>
            <Specs />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/diary" exact={true}>
            <Diary />
          </ProtectedRoute>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
