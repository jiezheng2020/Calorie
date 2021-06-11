import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import userpic from "./user.png";
import { setSpecs } from "../../store/session";

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [currDate, setcurrDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const history = useHistory();
  const [goal, setGoal] = useState(user.dailyGoal);

  const handleGoal = async () => {
    setEdit(false);
    await dispatch(setSpecs({ type: "edit", bmr: goal }));
  };

  return (
    <>
      <div className="userauth-page-container">
        <div className="userauth-page-background" />
        <div className="profile-container">
          <div className="userauth-page-image" />
          <h1 style={{ fontSize: "60px", marginTop: "80px", color: "#263238" }}>
            Welcome back to Calorie!
          </h1>
          <h4 style={{ marginTop: "20px", color: "#263238" }}>
            Here is your daily goal based on the input you've given us
          </h4>
          <div className="user-specs-container">
            <div className="user-specs-header">
              User Specifications for {user.username}
            </div>
            <div className="user-details-container">
              <img src={userpic} className="user-profile-pic" />
              <div className="user-body-container">
                <div className="user-body-goal">
                  <div
                    style={{
                      width: "230px",
                      height: "30px",
                      overflow: "hidden",
                    }}
                  >
                    Daily Goal: {goal} calories
                  </div>
                  <button
                    onClick={() => setEdit(!edit)}
                    className="user-goal-change"
                  >
                    Edit
                  </button>
                  <div hidden={!edit}>
                    <input
                      className="goal-edit-btn"
                      onChange={(e) => setGoal(e.target.value)}
                      type="number"
                      min="0"
                    />
                    <i
                      onClick={() => handleGoal()}
                      className="fas fa-check-square"
                    ></i>
                  </div>
                </div>
                <div className="user-body-other">
                  Current weight: {user.weight} lbs
                </div>
                <div
                  onClick={() => history.push("/diary")}
                  className="user-prof-diary"
                >
                  Start logging into your diary for the day!
                  <div className="diary-go">
                    <i
                      style={{ marginRight: "5px" }}
                      className="fas fa-book"
                    ></i>
                    {currDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ marginTop: "200px", marginBottom: "40px" }}>
              Meet the Developer
            </h1>
            <div className="about-me">
              <div className="about-me-pic" />
              <div className="about-me-blurb">
                <h4 style={{ borderBottom: "solid #eeeeee thin" }}>
                  Kevin Zheng
                </h4>
                I graduated from Northwestern University in 2020 with a
                bachelors in Mechanical Engineering. During my time there, I
                realized that my passions didn't align with what I was learning.
                I was always drawn to the design and problem solving aspect of
                MechE more so than the theory behind it. I believe that the tech
                industry is the future and can impact people's lives in ways the
                traditional manufacturing industry cannot, and I hope to become
                someone that can do that through software and technology.
              </div>
            </div>
            <div className="about-links">
              <a href="https://github.com/jiezheng2020">
                <i
                  style={{ marginRight: "20px" }}
                  class="fab fa-github-square"
                ></i>
              </a>
              <a href="https://www.linkedin.com/in/kevin-zheng-1387a7138/">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
