import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./Splash.css";
import website from "./website.PNG";

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

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="welcome-page-container">
      <div
        className="welcome-background"
        style={{ transform: `translateX(${offsetY * 0.055}px)` }}
      />
      <div
        className="welcome-icon1"
        style={{
          overflow: "hidden",
          transform: `translateX(${offsetY * 0.1}px) translateY(${
            offsetY * 0.1
          }px)`,
        }}
      />

      <div
        className="welcome-icon2"
        style={{
          overflow: "hidden",
          transform: `translateX(-${offsetY * 0.1}px) translateY(-${
            offsetY * 0.1
          }px)`,
        }}
      />

      <div
        className="welcome-icon3"
        style={{
          overflow: "hidden",
          transform: `translateX(${offsetY * 0.1}px) translateY(-${
            offsetY * 0.3
          }px)`,
        }}
      />

      <div
        className="welcome-icon4"
        style={{
          overflow: "hidden",
          transform: `translateY(-${offsetY * 0.225}px)`,
        }}
      />

      <div className="welcome-content">
        <div className="welcome-page1">
          <h1>Calorie</h1>
          <div>Calorie counting made easy!</div>
          <button className="welcome-demo-btn" onClick={() => handleDemo()}>
            Demo
          </button>
        </div>
        <div className="welcome-page2">
          <div>
            Log into your daily diary and watch those numbers goes down!
          </div>
          <img alt="" className="website-pic" src={website} />
          <a
            className="welcome-demo-btn repo-btn"
            href="https://github.com/jiezheng2020/Calorie"
          >
            Github
          </a>
        </div>
        <div className="welcome-page3">
          <div style={{ "text-shadow": "#000034 1px 0 10px" }}>
            Start your fitness journey today!
          </div>
          <div className="welcome-auth-btns">
            <button
              className="welcome-demo-btn welcome-login"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
            <button
              className="welcome-demo-btn"
              onClick={() => history.push("/sign-up")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash;
