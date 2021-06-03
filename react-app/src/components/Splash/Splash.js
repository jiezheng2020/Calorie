import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  ZoomIn,
} from "react-scroll-motion";

import "./Splash.css";

const FadeAnimation = batch(Move(0, 1000, 0, -200), Sticky(), FadeOut(1, 0));

function Splash() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  async function handleDemo() {
    await dispatch(login("demo@aa.io", "password"));
  }

  if (user) {
    history.push("/");
  }

  return (
    <div className="page-container">
      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={FadeAnimation}>
            <div className="page page1">
              <div className="page1-image"></div>
              <div className="page1-right">
                <h2>Welcome to Calorie!</h2>
                <div className="page1-header">
                  Free online calorie counter and diet plan.
                </div>
                <div className="page1-buttons">
                  <button onClick={() => history.push("/login")}>Login</button>
                  <button onClick={() => history.push("/sign-up")}>
                    SignUp
                  </button>
                  <button onClick={() => handleDemo()}>Demo</button>
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={FadeAnimation}>
            <div className="page page1">
              <div className="page1-image"></div>
              <div className="page1-right">
                <h2>Welcome to Calorie!</h2>
                <div className="page1-header">
                  Free online calorie counter and diet plan.
                </div>
                <div className="page1-buttons">
                  <button onClick={() => history.push("/login")}>Login</button>
                  <button onClick={() => history.push("/sign-up")}>
                    SignUp
                  </button>
                  <button onClick={() => handleDemo()}>Demo</button>
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={FadeAnimation}>
            <div className="page page1">
              <div className="page1-image"></div>
              <div className="page1-right">
                <h2>Welcome to Calorie!</h2>
                <div className="page1-header">
                  Free online calorie counter and diet plan.
                </div>
                <div className="page1-buttons">
                  <button onClick={() => history.push("/login")}>Login</button>
                  <button onClick={() => history.push("/sign-up")}>
                    SignUp
                  </button>
                  <button onClick={() => handleDemo()}>Demo</button>
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
}

export default Splash;
