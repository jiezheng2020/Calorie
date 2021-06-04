import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp, login } from "../../store/session";
import "./AuthForm.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    } else {
      setErrors(["password: Passwords must match"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleDemo = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="form-image-container" />
      <div className="form-container">
        <div className="form-header">
          <h2>Welcome to Calorie</h2>
          <div className="form-header-text">
            Get started on your fitness journey today!
          </div>
        </div>
        <div className="form-content-container">
          <form onSubmit={onSignUp}>
            <div className="form-fields">
              <label>User Name</label>
              <div>
                <input
                  className="form-field-input"
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
            </div>
            <div className="form-fields">
              <label>Email</label>
              <div>
                <input
                  className="form-field-input"
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
            </div>
            <div className="form-fields">
              <label>Password</label>
              <div>
                <input
                  className="form-field-input"
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
            </div>
            <div className="form-fields">
              <label>Repeat Password</label>
              <div>
                <input
                  className="form-field-input"
                  type="password"
                  name="repeat_password"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
            </div>
            <Link className="account-redirect" to="/login">
              <div>Already have an account? Login here!</div>
            </Link>
            <button className="userform-btn" type="submit">
              Sign Up
            </button>
            <button onClick={() => handleDemo()} className="demo-btn">
              Demo
            </button>
            <div className="image-form-container"></div>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
